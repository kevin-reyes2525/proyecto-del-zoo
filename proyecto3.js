import java.net.*;
import java.util.ArrayList;
import java.io.*;
import javax.swing.*;
import java.awt.event.*;

public class Cliente extends JFrame implements ActionListener{
	private JPanel panel = new JPanel();
	private Socket socket;
	private DataOutputStream out;
	private DataInputStream  in;
	private BufferedReader buff;
	private JTextArea text;
	private JComboBox lista;
    private JOptionPane menj = new JOptionPane();
	private JButton ayuda,enviar;
	private JScrollPane Sc,sc1;
	private JTextField tfield;
	private ArrayList<String> previo = new ArrayList<String>();
	int i=0;
	public Cliente() {
		setSize(700,500);
		setLocationRelativeTo(null);
		setLayout(null);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
		setVisible(true);
		Elementos();
		panel.setSize(550,500);
		panel.setVisible(true);
		setContentPane(panel);
		this.tfield.addKeyListener(new KeyListener() {
			@Override
			public void keyPressed(KeyEvent e) {
				if(e.getKeyChar()==KeyEvent.VK_ENTER) {
					if(!tfield.getText().isEmpty()) {
						Accionar();
					}
				}
				if(e.getKeyCode()==KeyEvent.VK_UP) {
					if(i>0) {
						tfield.setText(previo.get(i=i-1));
					}
				}
				if(e.getKeyCode()==KeyEvent.VK_DOWN) {
					if(i<previo.size()) {
						tfield.setText(previo.get(i++));
					}
				}
			}
			@Override
			public void keyReleased(KeyEvent arg0) {

			}
			@Override
			public void keyTyped(KeyEvent e) {

			}
		});
	}
	private void Elementos() {
		panel.setLayout(null);
		this.text = new JTextArea();
		this.text.setEditable(false);
		this.tfield = new JTextField();
		this.sc1 = new JScrollPane(tfield);
		this.sc1.setBounds(80,335,365,30);
		this.sc2 = new JScrollPane(text);
		this.sc2.setBounds(10,10,670,410);
		this.enviar = new JButton("Enviar");
		this.help = new JButton("Help");
		this.help.setBounds(10,435,70,28);
		this.enviar.setBounds(465,435,100,28);
		this.enviar.addActionListener(this);
		this.help.addActionListener(this);
		String lis[]= {"","Inicio","/mostrar","/buscar","/buscarN","/Surprise","/Clear"};
		this.lista = new JComboBox(lis);
		this.lista.setBounds(575,435,100,28);
		this.lista.addItemListener(new ItemListener () {
			@Override
			public void itemStateChanged(ItemEvent arg0) {
				String comando = (String) lista.getSelectedItem();
				tfield.setText(comando);
			}
		});


		panel.add(Sc);panel.add(sc1);panel.add(ayudar);
		panel.add(enviar);panel.add(lista);
	}

	private void Accionar() {
		previo.add(tfield.getText());
		i=previo.size();
		if(tfield.getText().equalsIgnoreCase("/Clear")) {
			text.setText(null); 
			tfield.setText(null);
		}else {
			text.append("-----------------------------------------------------------\n");
			text.append("CLIENTE: "+tfield.getText());
			try {
				socket = new Socket("localhost",6558);
				out = new DataOutputStream(socket.getOutputStream());
				in = new DataInputStream(socket.getInputStream());
				out.writeUTF(tfield.getText());
				text.append("\n"+in.readUTF());
				text.append("-----------------------------------------------------------\n");
				out.close();
				in.close();
				socket.close();
			} catch (IOException e1) {
				text.append("error:"+e1.getMessage());
			}
			this.tfield.setText(null);
		}
	}
	@Override
	public void actionPerformed(ActionEvent e) {
		if(e.getSource()==enviar) {
			if(!tfield.getText().isEmpty()) {
				Accionar();
			}
		}
		if(e.getSource()==ayuda) {
			menj.showMessageDialog("presione seleccionar y despues enter para continuar con la ayuda");
		}
	}
	public static void main(String agrs[]) {
		Cliente x = new Cliente();
	}
}