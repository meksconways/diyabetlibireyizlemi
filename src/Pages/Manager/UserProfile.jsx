import React, {Component} from 'react'
import HeaderNameItem from "../../Components/HeaderNameItem";
import {fetchManagerUserProfileDelete, fetchManagerUserProfileGet} from "../../Networking/ApiFetchService";
import {Button, Grid, Header, Icon, Segment} from "semantic-ui-react";
import KanDegeriEkleModal from "../../Components/KanDegeriEkleModal";
import BiyolojikDegerEkleModal from "../../Components/BiyolojikDegerEkleModal";


export default class UserProfile extends Component{


    constructor(props) {
        super(props);
        this.state = {
            userData:{},
            userId:this.props.match.params.user_id,
            kanDegeriEkleModalVisibility:false,
            biyolojikDegerEkleModalVisibility:false,
            deleteBtnLoading:false
        }

    }

    handleBiyolojikModalClose = () =>{

        this.setState({biyolojikDegerEkleModalVisibility:false});

    };

    handleModalClose = () =>{

        this.setState({kanDegeriEkleModalVisibility:false});

    };

    componentWillMount() {

        document.title = this.state.userData.name_surname+' • Diyabetli Birey İzlem';
        this.getUser();
    }

    getUser = () =>{

        fetchManagerUserProfileGet(this.state.userId,res => {




            if ((typeof res).toString() === "undefined") {

                // route login

            }else{

                if (res.status >= 400 && res.status < 500){

                    //this.setState({errorMessage:res.data.errors})

                } else if (res.status >=200 && res.status < 300) {

                    this.setState({userData:res.data.data});
                    document.title = this.state.userData.name_surname+' • Diyabetli Birey İzlem';


                }

            }


        });



    };

    deleteUser = () => {
        this.setState({deleteBtnLoading:true});

        fetchManagerUserProfileDelete(this.state.userId,res => {

            if ((typeof res).toString() === "undefined") {

                // route login

            }else{

                if (res.status >= 400 && res.status < 500){

                    //this.setState({errorMessage:res.data.errors})

                } else if (res.status >=200 && res.status < 300) {

                    window.location.href = '/';

                }

            }


        });


    };



    render() {
        return (
            <div>
                <HeaderNameItem title={this.state.userData.name_surname}/>
                <div style={{paddingTop:'2em',paddingLeft:'2em',
                    paddingRight:'2em',paddingBottom:'2em'}}>

                    <Segment placeholder loading={this.state.pageLoading}
                    >

                        <Grid
                        >
                            <Grid.Row textAlign={'center'} verticalAlign={'middle'} divided={true} >

                                <Grid.Column
                                    computer={2} tablet={8} mobile={16} textAlign={'center'}
                                    style={{paddingLeft:'2em',
                                        paddingRight:'2em',paddingBottom:'2em'}}

                                >
                                    <Icon name={'user'} size={'massive'}/>



                                </Grid.Column>


                                <Grid.Column
                                    computer={4} tablet={8} mobile={16}
                                    style={{paddingLeft:'2em',
                                        paddingRight:'2em',paddingBottom:'2em'}}

                                >
                                    <Header as={'h3'} style={{textAlign:'left'}}>
                                        İsim Soyisim: &nbsp;{this.state.userData.name_surname}</Header>
                                    <Header as={'h3'} style={{textAlign:'left'}}>
                                        User ID: &nbsp;{this.state.userData.userid}</Header>
                                    <Header as={'h3'} style={{textAlign:'left'}}>
                                        E-Posta: &nbsp;{this.state.userData.email}</Header>
                                    <Header as={'h3'} style={{textAlign:'left'}}>
                                        Kullanıcı Tipi: &nbsp;Normal Üye</Header>




                                </Grid.Column>

                                <Grid.Column
                                    computer={4} tablet={8} mobile={16}
                                    style={{paddingLeft:'2em',
                                        paddingRight:'2em',paddingBottom:'2em'}}

                                >
                                    <Button color='red' fluid style={{marginTop:'1em'}}
                                            onClick={() => this.setState({kanDegeriEkleModalVisibility:true})}
                                    ><Icon name='heartbeat' />Kan Değeri Ata</Button>

                                    {this.state.kanDegeriEkleModalVisibility ? <KanDegeriEkleModal
                                            data={this.state.userData}
                                            call={this.handleModalClose}
                                        />

                                        : null}

                                    <Button color='green' fluid style={{marginTop:'1em'}}
                                            onClick={() => this.setState({biyolojikDegerEkleModalVisibility:true})}
                                    ><Icon name='user md' />Biyolojik Değer Ata</Button>

                                    {this.state.biyolojikDegerEkleModalVisibility ? <BiyolojikDegerEkleModal
                                            data={this.state.userData}
                                            callB={this.handleBiyolojikModalClose}
                                        />

                                        : null}


                                    <Button color='grey' fluid style={{marginTop:'1em'}}
                                    onClick={this.deleteUser} loading={this.state.deleteBtnLoading}
                                    >
                                        <Icon name='trash alternate outline' />
                                        Kullanıcıyı Sil</Button>




                                </Grid.Column>

                            </Grid.Row>

                        </Grid>


                    </Segment>
                </div>

            </div>
        );
    }


}