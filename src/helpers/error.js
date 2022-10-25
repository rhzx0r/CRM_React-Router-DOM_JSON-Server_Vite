export default async function error(datos, email) {

  // Email regex validation
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  
  // Validacion de campos
  const errores = []
  if(Object.values(datos).includes('')) {
    errores.push('Todos los campos son obligatorios')
  }

  // Validacion de email
  if(!regex.test(email)) {
    errores.push('El email no es valido')
  }

  // Retornar informacion si hay errores
  if(Object.keys(errores).length) {
    return errores
  }
}
