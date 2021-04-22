public class Main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		BaseDatos db =  BaseDatos.getinstances();
		Server k = new Server();
		k.start();
	}

}