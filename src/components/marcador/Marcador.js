import '../marcador/Marcador.scss'
function Marcador() {

    return (
        <div className='marcador'>
            <div className='marcador_titulo'>SCORE</div>

            <div className='marcador_flex'>
                <div>
                    <p className='team_azul'>TEAM BLUE</p>
                    <p>piedras</p>
                </div>
                <div>
                    <p className='team_rojo'>TEAM RED</p>
                    <p>piedras</p>
                </div>
            </div>
            
            <div className='marcador_juegos'>
                <hr></hr>
                <div className='marcador_flex_2'>
                    <div className='marcador_azul'>1</div>
                    <div className='marcador_rojo'>0</div> 
                </div>
                
            </div>
        </div>


    )
}
export default Marcador;