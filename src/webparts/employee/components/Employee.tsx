import * as React from 'react';
import styles from './Employee.module.scss';
import { IEmployeeProps } from './IEmployeeProps';
import { IEmployeeState } from './IEmployeeState';
import { escape } from '@microsoft/sp-lodash-subset';
import {SPOperations} from "../Services/SPServices";
import { TextField} from '@fluentui/react/lib/TextField';
import { Dropdown, IDropdownOption, Label, Pivot, PivotItem, PrimaryButton,DefaultButton, List, IChoiceGroupOption, ChoiceGroup, format} from "office-ui-fabric-react";

import * as jquery from "jquery";
import { getJSON } from 'jquery';
import { useEffect, useState } from 'react';

export default class Employee extends React.Component<IEmployeeProps, IEmployeeState, {}> {
  public _spOps: SPOperations;
  public selectedListTitle:string;
  public selectedListTitle2:string;
  public selectedLeaveSettings: string;
  

  constructor(props: IEmployeeProps){
    super(props);
    this._spOps= new SPOperations();
    this.state= {listTitle:[], leaveSettings:[] ,status: "", sDate: "", items: [{id: "",
    user_id: "",
    start_date: "",
    end_date: "",
    cc: "",
    type: "",
    comment: "",
    status: ""}],
    creds:[{text: ""}]};
  }
public getListTitle=(event:any, data:any)=>{
  this.selectedListTitle=data.text;
};
public getLeaveSettings=(event:any, data:any)=>{
  this.selectedLeaveSettings=data.text;
};
public getListTitle2=(event:any, data:any)=>{
  this.selectedListTitle2=data.text;
};
public componentDidMount(){
  this._spOps.GetAllHolidayList(this.props.context).then((result:IDropdownOption[])=>{
    this.setState({listTitle:result}); })

    fetch("https://contosofunctions.azurewebsites.net/api/getitem/")
    .then((res) => res.json())
    .then((json) => {
    this.setState({items: json});
    })
  
  this._spOps.GetAllLeaveSettings(this.props.context).then((result:IChoiceGroupOption[])=>{
    this.setState({leaveSettings: result});
  })
}

  public render(): React.ReactElement<IEmployeeProps> {
    let option: IDropdownOption[]=[];

    const check= "random2@ContossoModWork.onmicrosoft.com";
    const print1= this.state.leaveSettings.map(item=><p>{item.key}</p>);
    const print2= this.state.leaveSettings.map(item=><p>{item.text}</p>);
    const printList1= this.state.listTitle.map( item=> <p>{item.text}</p>);
    const printList2= this.state.listTitle.map( item=> <p>{item.key.toString().substr(0,10)}</p>)
    const printSatus= this.state.items.map(item=> <tr><td>{item.user_id}</td><td>{item.start_date}</td><td>{item.end_date}</td><td>{item.type}</td><td>{item.comment}</td><td>{item.cc}</td><td>{item.status}</td></tr>)

    return (
      <div className={ styles.employee }>
          <div className={styles.container}>
      <Pivot aria-label="Basic Pivot Example" >
      <PivotItem

headerText="Holidays"

headerButtonProps={{
  'data-order': '1',
  'data-title': 'My Files Title',
}}>

<div className={styles.grid}>
  <div className={styles.gridRow}>
  <div className={styles.smallCol}>
      Leave Type
    </div>
    <div className={styles.largeCol}>
      Number of Days
    </div>
    <div className={styles.smallCol}>
      {print2}
    </div>
    <div className={styles.largeCol}>
        {print1}
    </div>
  </div>
  </div>

<div className={styles.grid}>
  <div className={styles.gridRow}>
  <div className={styles.smallCol}>
      Occasion
    </div>
    <div className={styles.largeCol}>
        Date
    </div>
    <div className={styles.smallCol}>
      {printList1}
    </div>
    <div className={styles.largeCol}>
        {printList2}
    </div>
  </div>
  </div>
  </PivotItem>

        <PivotItem headerText="Apply for Leave">
          <form>
          <Label className={styles.label}>New Application for Leave</Label>
          <ChoiceGroup defaultSelectedKey="B" options={this.state.leaveSettings} onChange={_onChange} label="Select Leave Type" required={true} />
          <TextField id ="sDate" label="Start Date" onChange={(e)=> this.setState({sDate: (e.target as HTMLInputElement).value})} type="date" required= {true}/>          
          <TextField min={format(this.state.sDate,"YYYY-MM-DD")} label="End Date" type="date"/>
          <TextField label="Reason"/>
          <TextField label="Additional Approver" type="email"/>
          {/* Need to add suggestions for mail id */}
          <br/>
          <PrimaryButton text="Request Leave" className={styles.button}/> 
          </form>
        </PivotItem> 

        <PivotItem headerText="Request Status">
        <table>
  <tr><td>ID</td><td>Start Date</td><td>End Date</td><td>Type</td><td>Comment</td><td>CC</td><td>Status</td></tr>
  </table>
  <hr/>
  <table>
        <div>{printSatus}</div>
        </table>
        </PivotItem>
      
    </Pivot>
        </div>
      </div>
    );
    
function _onChange(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
  console.dir(option);
}
  } 
}