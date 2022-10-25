import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom";
import { obtenerCliente, actualizarCliente } from "../data/clientes"
import Formulario from "../components/Formulario"
import Error from "../components/Error";
import error from "../helpers/error";

export async function loader({params}) {
  const cliente = await obtenerCliente(params.clienteId);

  if(Object.values(cliente).length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'El cliente no existe'
    });
  }
  
  return await cliente
}

export async function action({request, params}) {

  const {clienteId} = params;

  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const email = formData.get('email');

  const errores = await error(datos, email);

  if(errores) {
    return errores
  }
  //Actualizar el cliente
  await actualizarCliente(clienteId, datos);
  
  return redirect('/');
}

function EditarCliente() {

  const navigate = useNavigate()
  const cliente = useLoaderData()
  const errores = useActionData()

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">A continuacion podras modificar los datos de un cliente</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate('/')}
        >
          Volver
        </button>
      </div>

      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>

        {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error> )}

        <Form
          method='post'
          action=''
          noValidate
        >
          <Formulario
            cliente={cliente}
          />

          <input 
            type="submit"
            className='mt-5 w-full  bg-blue-800 p-3 uppercase font-bold text-white text-lg'
            value="Guardar Cambios"
          />
        </Form>
      </div>
    </>
  )
}

export default EditarCliente