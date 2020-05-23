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

namespace HitTheRoad.Chatbot
{
    public class Bot : ActivityHandler
    {
        private readonly IHttpClientFactory httpClientFactory;

        public Bot(IHttpClientFactory httpClientFactory)
        {
            this.httpClientFactory = httpClientFactory;
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
            string topIntent = await Helpers.getTopIntent(httpClientFactory.CreateClient(), turnContext.Activity.Text);
            IMessageActivity reply;

            switch (topIntent)
            {
                case "findDestinations":
                    reply = await FindDestinations();
                    break;
                // case "findTrips":
                //     FindTrips();
                //     break;
                default:
                    reply = MessageFactory.Text("Não consegui entender! Pode repetir de outra forma?");
                    break;
            }

            await turnContext.SendActivityAsync(reply, cancellationToken);
        }

        private async Task<IMessageActivity> FindDestinations()
        {
            List<Destination> destinations = new List<Destination>();

            HttpClient client = httpClientFactory.CreateClient();
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, "https://localhost:5003/destinations/");

            HttpResponseMessage response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                destinations = JsonConvert.DeserializeObject<List<Destination>>(await response.Content.ReadAsStringAsync());
            }

            var reply = MessageFactory.Attachment(new List<Attachment>());

            foreach (Destination d in destinations)
            {
                HeroCard card = new HeroCard() {
                    Title = d.Name + " " + d.Flag,
                    Images = new List<CardImage> { new CardImage(d.Photo)}
                };

                reply.Attachments.Add(card.ToAttachment());
            }

            return reply;
        }

        private async Task FindTrips()
        {

        }
    }
}
