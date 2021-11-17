import * as React from 'react';
// import styles from './Public.module.scss';
import styles from '../../employee/components/Employee.module.scss';
import { IPublicProps } from './IPublicProps';
// import { IEmployeeState } from '../../employee/components/IEmployeeState';
import { IPublicState } from './IPublicState';
import { SPOperations } from '../Services/SPServices';
import { IDropdownOption } from 'office-ui-fabric-react';

export default class Public extends React.Component<IPublicProps, IPublicState, {}> {
public _spOps: SPOperations;
public selectedListTitle:string;

constructor(props: IPublicProps){
  super(props);
  this._spOps= new SPOperations();
  this.state={listTitle:[]};
}

  public componentDidMount(){
    this._spOps.GetAllHolidayList(this.props.context).then((result:IDropdownOption[])=>{
      this.setState({listTitle:result});
    });
    }

  public render(): React.ReactElement<IPublicProps> {

    const printList1= this.state.listTitle.map( item=> <p>{item.text}</p>);
    const printList2= this.state.listTitle.map( item=> <p>{item.key.toString().substr(0,10)}</p>);

    console.log(printList1, printList2);

    return (
           <div className={styles.grid}>
  <div className={styles.gridRow}>
  <div className={styles.smallCol}>
      Occasion
    </div>    <div className={styles.largeCol}>
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
    );
  }
}