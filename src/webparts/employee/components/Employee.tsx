import * as React from 'react';
import styles from './Employee.module.scss';
import { IEmployeeProps } from './IEmployeeProps';
import { IEmployeeState } from './IEmployeeState';
import { escape } from '@microsoft/sp-lodash-subset';
import {SPOperations} from "../Services/SPServices";
import { TextField} from '@fluentui/react/lib/TextField';
import { Dropdown, IDropdownOption, Label, Pivot, PivotItem, PrimaryButton,DefaultButton, List, IChoiceGroupOption, ChoiceGroup, format} from "office-ui-fabric-react";

import * as jquery from "jquery";

export default class Employee extends React.Component<IEmployeeProps, IEmployeeState, {}> {
  public _spOps: SPOperations;
  public selectedListTitle:string;
  public selectedLeaveSettings: string;

  constructor(props: IEmployeeProps){
    super(props);
    this._spOps= new SPOperations();
    this.state= {listTitle:[], leaveSettings:[] ,status: "", sDate: ""};
     
  }
public getListTitle=(event:any, data:any)=>{
  this.selectedListTitle=data.text;
};
public getLeaveSettings=(event:any, data:any)=>{
  this.selectedLeaveSettings=data.text;
};
public componentDidMount(){
  this._spOps.GetAllHolidayList(this.props.context).then((result:IDropdownOption[])=>{
    this.setState({listTitle:result})

  this._spOps.GetAllLeaveSettings(this.props.context).then((result:IChoiceGroupOption[])=>{
    this.setState({leaveSettings: result})
  })
  })
}

  public render(): React.ReactElement<IEmployeeProps> {
    let option: IDropdownOption[]=[];
    const { sDate } = this.state;
    //const{target}= event;
    const printList= this.state.listTitle.map( item=>
        <p>{item.text}&emsp;{item.key.toString().substr(0,10)}</p>)

    return (
      <div className={ styles.employee }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to Contosso Leave Management System!</span>     
            </div>
            
            </div>

          </div>
          <div className={styles.container}>
      <Pivot aria-label="Basic Pivot Example" >
        <PivotItem
          headerText="Public Holidays"
          headerButtonProps={{
            'data-order': '1',
            'data-title': 'My Files Title',
          }}
        >

          <Label className={styles.label}>Event</Label><Label className={styles.label}>Date</Label>
    <div>{printList}</div>

        {/*<Dropdown           
           placeholder="Select" className={styles.dropdown}
           options={this.state.listTitle}
           onChange={this.getListTitle}>
          </Dropdown>

          <TextField label="Date" type="date"/>

          <TextField label="New Event Name" />

          <PrimaryButton text="Create List Item" className={styles.button}
           onClick={()=>
            this._spOps
            .CreateHolidayList(this.props.context,this.selectedListTitle)
            .then((result:string)=>{
             this.setState({ status: result});
           })
           }>             
           </PrimaryButton>
           

           <PrimaryButton text="Update List Item" className={styles.button}
           >             
           </PrimaryButton>

           <PrimaryButton text="Delete List Item" className={styles.button}
           onClick={()=>this._spOps.DeleteItemHolidayList(
             this.props.context,
             this.selectedListTitle)}
           >             
           </PrimaryButton>  
           <div>{this.state.status}</div>   */}  
        </PivotItem>  

        <PivotItem headerText="Apply for Leave">
          <Label className={styles.label}>New Application for Leave</Label>
          <ChoiceGroup defaultSelectedKey="B" options={this.state.leaveSettings} onChange={_onChange} label="Select Leave Type" required={true} />
          <TextField id ="sDate" label="Start Date" onChange={(e)=> this.setState({sDate: (e.target as HTMLInputElement).value})} type="date" required= {true}/>          
          <TextField min={format(this.state.sDate,"YYYY-MM-DD")} label="End Date" type="date"/>
          {/* Need to add validation for start date< end date. Also, wondering if it is okay to not 
          keep end date as required as ppl may request single day leave as well */}
          <TextField label="Reason"/>
          <TextField label="Additional Approver" type="email"/>
          {/* Need to add suggestions for mail id */}
          <br/>
          <PrimaryButton text="Request Leave" className={styles.button}/> 
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