import '../marcador/Marcador.scss'
function Marcador({contadorBlueTeam,contadorRedTeam,contadorGamesBlueTeam,contadorGamesRedTeam}) {

    return (
        <div className='marcador'>
            <div className='marcador_titulo'>SCORE</div>

            <div className='marcador_flex'>
                <div>
                    <p className='team_azul'>TEAM BLUE</p>
                </div>
                <div>
                    <p className='team_rojo'>TEAM RED</p>
                </div>
            </div>
            
            <div className='marcador_juegos'>
                <div className='marcador_flex_2'>
                    <div className='marcador_azul'>{contadorBlueTeam}</div>
                    <div className='marcador_rojo'>{contadorRedTeam}</div> 
                </div>
                
            </div>
        </div>


    )
}
export default Marcador;