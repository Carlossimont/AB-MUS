import tapete from './img/tapete.jpg';
import './Room.scss'

function Room(){
return (

    <div style={{backgroundImage: `url(${tapete})`}} id="background">
        <div class="cuadro">
            <div class="cuadro" id="">
                <div class="cuadro">
                    <div class="cuadro">Player</div>
                <div>
                    <div class="cuadro">Carta1</div>
                    <div class="cuadro">Carta2</div>
                    <div class="cuadro">Carta3</div>
                    <div class="cuadro">Carta4</div>
                </div>
            </div>
                <div>
                    <div>
                        <div>
                            <div class="cuadro">Player</div>
                        </div>
                        <div>
                            <div class="cuadro">Carta1</div>
                            <div class="cuadro">Carta2</div>
                            <div class="cuadro">carta3</div>
                            <div class="cuadro">carta4</div>
                        </div>
                    </div>
                    <div class="cuadro">Centro</div>
                    <div>
                        <div>
                            <div class="cuadro">Carta1</div>
                            <div class="cuadro">Carta2</div>
                            <div class="cuadro">carta3</div>
                            <div class="cuadro">carta4</div>
                        </div>
                        <div class="cuadro">Player</div>
                    </div>
                </div>

                <div>
                    <div>
                        <div class="cuadro">Carta1</div>
                        <div class="cuadro">Carta2</div>
                        <div class="cuadro">Carta3</div>
                        <div class="cuadro">Carta4</div>
                    </div>
                    <div class="cuadro">
                        Player
                    </div>
                </div>
            </div>

            <div>
                <div></div>
                <div class="cuadro">CHAT</div>
            </div>

        </div>
    </div>
    )
}
export default Room;