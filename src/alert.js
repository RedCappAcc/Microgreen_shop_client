
import { transitions, positions, types } from 'react-alert'


export const options = {
    position: positions.BOTTOM_RIGHT,
    type: types.SUCCESS,
    timeout: 5000,
    offset: '100px',
    transition: transitions.SCALE,
    containerStyle: {}
  }

  export const AlertTemplate = ({message}) => (
    <div style={{color:'black',
                  marginRight:'20px', 
                  marginBottom:'20px',
                  fontSize:'16px', 
                  minWidth:'200px', 
                  height:'50px',
                  backgroundColor:'#51AE76',
                  borderRadius:'10px',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center'}}>
      <div style={{ padding:'5px' }}>{message}</div>
    </div>
  )