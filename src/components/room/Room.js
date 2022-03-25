import tapete from './img/tapete.jpg';
import './Room.scss'

function Room(){
return (

    <div style={{backgroundImage: `url(${tapete})`}} id="background">
        <div>

            <div>
                <div>
                    <div>Player</div>
                <div>
                    <div>Carta1</div>
                    <div>Carta2</div>
                    <div>Carta3</div>
                    <div>Carta4</div>
                </div>
            </div>
                <div>
                    <div>
                        <div>
                            <div>Player</div>
                        </div>
                        <div>
                            <div>Carta1</div>
                            <div>Carta2</div>
                            <div>carta3</div>
                            <div>carta4</div>
                        </div>
                    </div>
                    <div>Centro</div>
                    <div>
                        <div>
                            <div>Carta1</div>
                            <div>Carta2</div>
                            <div>carta3</div>
                            <div>carta4</div>
                        </div>
                        <div>Player</div>
                    </div>
                </div>

                <div>
                    <div>
                        <div>Carta1</div>
                        <div>Carta2</div>
                        <div>Carta3</div>
                        <div>Carta4</div>
                    </div>
                    <div>
                        Player
                    </div>
                </div>
            </div>

            <div>
                <div></div>
                <div>CHAT</div>
            </div>

        </div>
    </div>
    )
}
export default Room;