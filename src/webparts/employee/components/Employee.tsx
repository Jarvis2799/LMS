import * as React from 'react';
import styles from './Employee.module.scss';
import { IEmployeeProps } from './IEmployeeProps';
import { IEmployeeState } from './IEmployeeState';
import { escape } from '@microsoft/sp-lodash-subset';
import {SPOperations} from "../Services/SPServices";
import { TextField} from '@fluentui/react/lib/TextField';
import { setIconOptions } from "office-ui-fabric-react/lib/Styling";
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
    type: "",
    cc: "",
    comment: "",
    status: "",
    days: ""}],
    bal: [{
      id: "",
      text: ""
    }]
  };
  }
public getListTitle=(event:any, data:any)=>{
  this.selectedListTitle=data.text;
}
public getLeaveSettings=(event:any, data:any)=>{
  this.selectedLeaveSettings=data.text;
}
public getListTitle2=(event:any, data:any)=>{
  this.selectedListTitle2=data.text;
}
public componentDidMount(){
  this._spOps.GetAllHolidayList(this.props.context).then((result:IDropdownOption[])=>{
    this.setState({listTitle:result}); });

    fetch("https://contosofunctions.azurewebsites.net/api/getitem/")
    .then((res) => res.json())
    .then((json) => {
    this.setState({items: json});
    });
  
  this._spOps.GetAllLeaveSettings(this.props.context).then((result:IChoiceGroupOption[])=>{
    this.setState({leaveSettings: result});
  });
}

  public render(): React.ReactElement<IEmployeeProps> {

    const check= escape(this.props.userid);
    const print1= this.state.leaveSettings.map(item=><p>{parseInt(item.key)}</p>);
    const print2= this.state.leaveSettings.map(item=><p>{item.text}</p>);
    const printList1= this.state.listTitle.map( item=> <p>{item.text}</p>);
    const printList2= this.state.listTitle.map( item=> <p>{item.key.toString().substr(0,10)}</p>);

    var start: JSX.Element[]= [], end: JSX.Element[]= [], type: JSX.Element[]= [], days: JSX.Element[]= [], cc: JSX.Element[]= [], comment: JSX.Element[]= [], status: JSX.Element[]= [];

    if (this.state.items.length) {
      this.state.items.map((item) => { 
        if (item.user_id ===check.toString()) {start.push(<p key= {item.id}>{item.start_date}</p>) , 
        end.push(<p key= {item.id}>{item.end_date}</p>), type.push(<p key= {item.id}>{item.type}</p>), 
        cc.push(<p key= {item.id}>{item.cc}</p>), comment.push(<p key= {item.id}>{item.comment}</p>), 
        status.push(<p key= {item.id}>{item.status}</p>), days.push(<p key= {item.id}>{item.days}</p>)};
        }
        );
    }

    this.state.leaveSettings.map((item)=>{
      this.state.bal.push({id: item.text, text: item.key});
    })

    if (this.state.items.length) {
      this.state.items.map((item) => { 
        if (item.user_id ===check.toString()) {
          this.state.leaveSettings.map((newItem)=>{
            this.state.bal.map((nItem)=>{
            if(item.status==="approved".toString() && item.type.toString()===newItem.text.toString() && nItem.id===item.type){
                nItem.text= (parseInt(nItem.text)- parseInt(item.days)).toString();
              }})})
      }
    });
    }

    const balance= this.state.bal.map((item)=><p>{item.text}</p>);

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
        {balance}
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
     <div className={styles.grid}>
  <div className={styles.gridRow}>
  <div className={styles.smallColm}>
      Start Date
    </div>
    <div className={styles.smallColm}>
      End Date
    </div>
    <div className={styles.smallColm}>
      Type
    </div>
    <div className={styles.smallColm}>
      Comment
    </div>
    <div className={styles.smallColm}>
      Days
    </div>
    <div className={styles.smallColm}>
      Status
    </div>
    
    <div className={styles.smallColm}>
      {start}
    </div>
    <div className={styles.smallColm}>
        {end}
    </div>
    <div className={styles.smallColm}>
      {type}
    </div>
    <div className={styles.smallColm}>
      {comment}
    </div>
    <div className={styles.smallColm}>
      {days}
    </div>
    <div className={styles.smallColm}>
      {status}
    </div>
  </div>
  </div>

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