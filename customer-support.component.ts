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

  async invokeGPT() {


    if(this.promptText.length<2)
    return;
    var YOUR_GENERATED_SECRET = "QrQb3tJYYt7z4G4HGofN:e0445f4a8ee2bc8a29ecd24057761cae0915a0ed813c7abf90f91fb677e9b759";
    var resp = fetch('https://api.promptperfect.jina.ai/optimize', {
    headers: {
      'x-api-key': `token ${YOUR_GENERATED_SECRET}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      data: {
        prompt: this.promptText,
        targetModel: 'chatgpt',
      }
    }),
    method: 'POST'
  });
  let res = resp.then(val => {
    console.log(val);
  })
  console.log("resp: " + resp);




    // try{
    //   this.response = undefined;
    //   let configuration = new Configuration({apiKey: environment.apiKey});
    //   let openai = new OpenAIApi(configuration);
    //   let resp_2 = await resp;
    //   console.log("resp_2: " + resp_2.json);
    //   let promptnew = "Answer. " + resp_2;
    //   console.log("promptnew: " + promptnew);

    //   let requestData={
    //     model: 'text-davinci-003',//'text-davinci-003',//"text-curie-001",
    //     prompt: promptnew,//this.generatePrompt(animal),
    //     temperature: 0.95,
    //     max_tokens: 3000,
    //     top_p: 1.0,
    //     frequency_penalty: 0.0,
    //     presence_penalty: 0.0,
    //   };
    //   this.showSpinner = true;
    //   let apiResponse =  await openai.createCompletion(requestData);

    //   this.response = apiResponse.data as ResponseModel;
    //   this.pushChatContent(this.response.choices[0].text.trim(),'Mr Bot','bot');
    //   this.showSpinner = false;
    // }catch(error:any) {
    //   this.showSpinner = false;
    //   // Consider adjusting the error handling logic for your use case
    //   if (error.response) {
    //     console.error(error.response.status, error.response.data);

    //   } else {
    //     console.error(`Error with OpenAI API request: ${error.message}`);

    //   }
    // }
  }
}
