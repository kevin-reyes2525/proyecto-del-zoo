import java.sql.*;
public class DB {
	private static DB DB = new DB();
	private Connection conexion;
	private Statement st;
    private String dbName = "Register";
	private String urlDB = "jdbc:postgresql://localhost:4335/"+this.dbName;
	private String userDB = "postgres";
	private String passDB = "admin";
	private PreparedStatement pstmt;
	private ResultSet rc;
	private String driverDB = "org.postgresql.Driver";
	

	public static DB getinstances() {
		return DB;
	}
	private DB() {
		try {
			Class.forName(driverDB);
			this.conn=DriverManager.getConnection(urlDB,userDB,passDB);
		}catch(ClassNotFoundException | SQLException e){
			e.printStackTrace();
		}
	}

	public String Mostrar(String sentencia) {
		String texto="";
		try {
			this.st = this.con.createStatement();
			this.rc = this.stmt.executeQuery(sentencia); 
			while(rc.next()) {
				texto+="-->ID: "+rc.getString("Id")+", Nombre: "+rc.getString("Nombre")+", Clase:"+ rc.getString("Clase")
				+ ", Habitat: " +rc.getString("Habitat")+ ", Comida:"+rc.getString("Comida")
				+", Nocturno"+rc.getString("Nocturno")+"\n";
			}
		}catch(SQLException e) {
			return "SERVER: "+e.getMessage()+"\n";
		}finally {
			try {
				this.st.close();
				this.rc.close();
			}catch(Exception e) {
			}
		}
		return texto;
	}


	public void Editar(String obj[]) {
		try {
			this.pstmt = conexion.prepareStatement("UPDATE Animales SET Clase=?,Nombre=?,Habitat=?,Comida=?,Horario=? WHERE Id= "+obj[0]);
			this.pstmt.setString(1, obj[1]);
			this.pstmt.setString(2, obj[2]);
			this.pstmt.setString(3, (obj[3]));
			this.pstmt.setString(4, (obj[4]));
			this.pstmt.setBoolean(5, Boolean.parseBoolean(obj[5]));
			System.out.println("Animal modificado");
		}catch(SQLException l) {
			System.out.println("error "+l.getMessage());
		}finally {
			try {
				this.pstmt.close();
			}catch(Exception f) {
				f.getStackTrace();
			}
		}
	}

	public String BuscarNombre(String nombre) {
		try {
			this.st = this.conexion.createStatement();
			this.rc = this.st.executeQuery("SELECT*FROM Animales");
			while(rs.next()) {
				if(rs.getString("nombre").equalsIgnoreCase(nom)) {
					return "-->ID: "+rc.getString("Id")+", Nombre: "+rc.getString("Nombre")+", Clase:"+ rc.getString("Clase")
					+ ", Habitat: " +rc.getString("Habitat")+ ", Comida:"+rc.getString("Comida")
					+", Nocturno"+rc.getString("Nocturno")+"\n";
				}
			}
		}catch(SQLException e) {
			return "SERVIDOR: error en su busqueda";
		}finally {
			try {
				this.st.close();
				this.rc.close();
			}catch(SQLException e) {
				e.getStackTrace();
			}
		}
		return null;
	}

	public void dbClose() {
		try {
			this.conexion.close();
		}catch(SQLException u) {
			u.printStackTrace();
		}
	}
}