// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
//
// Generated with EchoBot .NET Template version v4.9.1

using AdaptiveCards;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Schema;
using Newtonsoft.Json;
using HitTheRoad.Classes;
using System.Linq;
using Microsoft.Extensions.Configuration;

namespace HitTheRoad.Chatbot
{
    public class Bot : ActivityHandler
    {
        private readonly IHttpClientFactory httpClientFactory;
        private readonly IConfiguration configuration;
        private List<Destination> destinations;

        public Bot(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            this.httpClientFactory = httpClientFactory;
            this.configuration = configuration;
            destinations = new List<Destination>();
        }

        protected override async Task OnMembersAddedAsync(IList<ChannelAccount> membersAdded, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
        {
            var welcomeText = "Bem vindo ao bot da Hit The Road!\n\n Me pergunte algo, como, por exemplo: \"*Quais são os destinos que trabalhamos*\" ou \"*Gostaria de viajar de São Paulo para Londres*\"";

            foreach (var member in membersAdded)
            {
                if (member.Id != turnContext.Activity.Recipient.Id)
                {
                    await turnContext.SendActivityAsync(MessageFactory.Text(welcomeText, welcomeText), cancellationToken);
                }
            }
        }

        protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
        {
            string prediction = await Helpers.getLuisPrediction(httpClientFactory.CreateClient(), turnContext.Activity.Text);
            string topIntent = string.Empty;
            Dictionary<string, string> entities = new Dictionary<string, string>();

            IMessageActivity reply;

            if (prediction != "Error")
            {
                topIntent = Helpers.getTopIntent(prediction);
                entities = Helpers.getDestinations(prediction);
            }

            switch (topIntent)
            {
                case "findDestinations":
                    reply = await FindDestinations();
                    break;
                case "findTrip":
                    reply = await FindTrips(entities);
                    break;
                default:
                    reply = MessageFactory.Text("Não consegui entender! Pode repetir de outra forma?");
                    break;
            }

            await turnContext.SendActivityAsync(reply, cancellationToken);
        }

        private async Task GetDestinations()
        {
            HttpClient client = httpClientFactory.CreateClient();
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, string.Concat(configuration["Endpoints:Api"], "destinations/"));
            HttpResponseMessage response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
                destinations = JsonConvert.DeserializeObject<List<Destination>>(await response.Content.ReadAsStringAsync());
        }

        private async Task<IMessageActivity> FindDestinations()
        {
            if (destinations.Count == 0)
            {
                await GetDestinations();
            }

            var reply = MessageFactory.Carousel(new List<Attachment>());

            foreach (Destination d in destinations)
            {
                HeroCard card = new HeroCard() {
                    Title = d.Name + " " + d.Flag,
                    Images = new List<CardImage>{new CardImage(d.Photo)}
                };

                reply.Attachments.Add(card.ToAttachment());
            }

            return reply;
        }

        private async Task<IMessageActivity> FindTrips(Dictionary<string, string> entities)
        {
            var reply = MessageFactory.Attachment(new List<Attachment>());
            List<Trip> trips = new List<Trip>();
            
            if (destinations.Count == 0)
            {
                await GetDestinations();
            }

            Destination origin = destinations.Where(d => d.Name.ToLower() == entities.First().Key.ToLower()).FirstOrDefault();
            Destination destination = destinations.Where(d => d.Name.ToLower() == entities.Last().Key.ToLower()).FirstOrDefault();

            HttpClient client = httpClientFactory.CreateClient();
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, string.Concat(configuration["Endpoints:Api"], "trips/origin/", origin.Id, "/destination/", destination.Id));
            HttpResponseMessage response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
                trips = JsonConvert.DeserializeObject<List<Trip>>(await response.Content.ReadAsStringAsync());

            foreach (Trip trip in trips)
            {
                HeroCard card = new HeroCard() {
                    Title = string.Concat(trip.Origin.Name, " ➡️ ", trip.Destination.Name),
                    Text = string.Concat("R$ ", string.Format("{0:0.##}",trip.Price)),
                    Images = new List<CardImage>{new CardImage(trip.Destination.Photo)},
                    Buttons = new List<CardAction>{new CardAction(ActionTypes.OpenUrl, "Comprar passagens", value: "https://skyscanner.com.br/")}
                };

                reply.Attachments.Add(card.ToAttachment());
            }

            return reply;
        }
    }
}
