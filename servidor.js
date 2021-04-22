import java.io.*;
import java.net.*;
import java.sql.SQLException;

public class Server extends Thread {
    private DataInputStream entrar=null;
	private DataOutputStream out=null;
	BaseDatos db = BaseDatos.getinstances();
	private Socket socket=null;
	private ServerSocket Ssocket=null;


	@Override
	public void run() {
		try {
			Ssocket=new ServerSocket(3000);
			while(true) {
				try {
					socket=Ssocket.accept();
					entrar=new DataInputStream(socket.getInputStream());
					String command[] = entrar.readUTF().split("");
					out=new DataOutputStream(socket.getOutputStream());
					out.writeUTF(Consulta(command));
					in.close();
					out.close();
				}catch(IOException e) {
					System.out.println("problemas al escribir el servidor: "+ e.getMessage());
				}
			}
		}catch(IOException l) {
			System.out.println("problemas con iniciar el servidor: "+ l.getMessage());
		}finally {
			try {
				Ssocket.close();
				socket.close();
			}catch(IOException i) {
				System.out.println("problemas con cerrar el servidor: "+ i.getMessage());
			}
		}
	}

	private String Consulta(String command[]) {
		try {
			if(command[0].equalsIgnoreCase("Iniciar")) {
				return "\nSERVER: ¡Bienvenido al sistema!\n"
						+ "estos son los siguientes opciones:\n"
						+ " /mostrar\n"
						+ " /buscar (Por ID)\n"
						+ " /buscarN (por grupo)\n"
						+ " /Surprise (es una sorpresa)\n"
						+ "/Clear (Borrar Texto)\n"

			}

			if(command[0].equalsIgnoreCase("/mostrar")) {
				return db.Mostrar("SELECT *FROM Animales ORDER BY Id ASC");
			}

			if(command[0].equalsIgnoreCase("/buscar")) {
				if(db.Mostrar("SELECT*FROM Animales WHERE Id="+command[1])!=null"") {
					return db.Mostrar("SELECT*FROM Animales WHERE Id="+command[1]);
				}else {
					return "\nSERVER: ID incorrecta.";
				}
			}

			if(command[0].equalsIgnoreCase("/buscarN")) {
				if(db.BuscarNombre(command[1])!=null) {
					return db.BuscarNombre(command[1]);
				}
				else {
					return "\nSERVER: pruebe con otro nombre.";
				}
			}

			
			if(command[0].equalsIgnoreCase("/Surprise")) {
				return "\nSERVER: ¡gracias por usar la consola!"
						
			}
		}catch(Exception p) {
			return "SERVER: error en el comando: " + p.getMessage();
		}
		return"SERVER: oh, oh, ha ocurrido un severo error";
	}
}