import { WebPartContext } from "@microsoft/sp-webpart-base";
import {  ISPHttpClientOptions,SPHttpClient,SPHttpClientResponse } from '@microsoft/sp-http';
import { IChoiceGroupOption, IDropdownOption } from "office-ui-fabric-react";

import {  } from "@pnp/common";



export class SPOperations{
    public GetAllHolidayList(context: WebPartContext): Promise<IDropdownOption[]>{
        let restApiUrl: string= context.pageContext.web.absoluteUrl+"/_api/web/lists/getByTitle('PublicHolidays')/items";
        var listTitle: IDropdownOption[]=[];

        return new Promise<IDropdownOption[]>(async(resolve, reject)=>{
            context.spHttpClient.get(restApiUrl, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse)=>{
            response.json().then((results:any)=>{
                console.log(results);
                results.value.map((result:any)=>{
                    listTitle.push({
                        key: result.Date,
                        text: result.Title,
                    });
                });
            });
            resolve(listTitle);
        },
        (error:any):void=>{
            reject("error occured" + error);
        }); 
        
        });

       
    }
    
}