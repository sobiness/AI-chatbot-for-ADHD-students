import { Component, OnInit } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { environment } from 'src/environments/environment';
import { ChatWithBot, ResponseModel } from '../models/gpt-response';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.css']
})
export class CustomerSupportComponent implements OnInit {
chatConversation: ChatWithBot[]=[];
response!: ResponseModel | undefined;
    promptText = '';
    showSpinner = false;
    age=5;

  constructor() { }

  ngOnInit(): void {
  }

  checkResponse() {
    this.pushChatContent(this.promptText,'You','person');
    this.invokeGPT();
  }


  pushChatContent(content:string, person:string, cssClass:string) {
    const chatToPush: ChatWithBot = { person:person, response:content, cssClass:cssClass};
    this.chatConversation.push(chatToPush);
  }


  getText(data:string) {
    return data.split('\n').filter(f=>f.length>0);
  }
  async openai(promptFromApi: any) {
    this.response = undefined;
      let configuration = new Configuration({apiKey: environment.apiKey});
      let openai = new OpenAIApi(configuration);
      let promptnew = await promptFromApi;
      console.log("promptnew: " + promptnew);

      let requestData={
        model: 'text-davinci-003',//'text-davinci-003',//"text-curie-001",
        prompt: promptnew,//this.generatePrompt(animal),
        temperature: 0.95,
        max_tokens: 3000,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      };
      this.showSpinner = true;
      let apiResponse =  await openai.createCompletion(requestData);

      this.response = apiResponse.data as ResponseModel;
      console.log(this.response);
      this.pushChatContent(this.response.choices[0].text.trim(),'Mr Bot','bot');
      this.showSpinner = false;
  }

  async invokeGPT() {
  if (this.promptText.length < 2)
    return;

  var YOUR_GENERATED_SECRET = "";
  try {
    var text = this.promptText + `. Explain this to an adhd affected child of ${this.age} years.`;
    const resp = await fetch('https://api.promptperfect.jina.ai/optimize', {
      headers: {
        'x-api-key': `token ${YOUR_GENERATED_SECRET}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          prompt: text,
          targetModel: 'chatgpt',
        }
      }),
      method: 'POST'
    });

    const data = await resp.json();
    var promptFromApi = data.result.promptOptimized;
    console.log(promptFromApi);

    this.openai(promptFromApi);

  } catch (error) {
    console.error('Error occurred:', error);
  }
}

  }

