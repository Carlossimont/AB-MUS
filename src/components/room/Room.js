import tapete from './img/tapete.jpg';
import './Room.scss'
import Teams from '../teams/Teams'
import { useState } from 'react';

function Room() {

    let [cnntn, setCnntn] = useState(false)
    return (

        <div style={{ backgroundImage: `url(${tapete})` }} id="background">
            {!cnntn ? 
                <Teams setCnntn={setCnntn}/> 
            :
                <div className="flex">
                    <div className="team1">
                        <div className="player1">
                            <div>
                                <div className="avatar 1p">
                                    avatar1
                                </div>
                                <div className="cards1">
                                    <div className="card 1p1">1card1p</div>
                                    <div className="card 1p2">2card1p</div>
                                    <div className="card 1p3">3card1p</div>
                                    <div className="card 1p4">4card1p</div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="team2">
                        <div className="player2">
                            <div className="avatar 4p">
                                avatar4
                            </div>
                            <div className="cards2">
                                <div className="card 4p1">1card4p</div>
                                <div className="card 4p2">2card4p</div>
                                <div className="card 4p3">3card4p</div>
                                <div className="card 4p4">4card4p</div>
                            </div>
                        </div>



                        <div className="player2">
                            <div className="avatar 2p">
                                avatar2
                            </div>
                            <div className="cards2">
                                <div className="card 2p1">1card2p</div>
                                <div className="card 2p2">2card2p</div>
                                <div className="card 2p3">3card2p</div>
                                <div className="card 2p4">4card2p</div>
                            </div>
                        </div>
                    </div>

                    <div className="team1">
                        <div className="player3">
                            <div className="avatar 3p">
                                avatar3
                            </div>
                            <div className="cards1">
                                <div className="card 3p1">1card3p</div>
                                <div className="card 3p2">2card3p</div>
                                <div className="card 3p3">3card3p</div>
                                <div className="card 3p4">4card3p</div>
                            </div>
                            <div>
                                <div className="buttons">Mus</div>
                                <div className="buttons">No hay mus</div>
                                <div className="buttons">ÓRDAGO ME CAGO EN DIOS</div>
                            </div>
                        </div>
                    </div>

                </div>

            }

        </div>

    )
}
export default Room;