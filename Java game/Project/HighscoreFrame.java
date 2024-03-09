package menu;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;

import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;

/**
 * @author masor844
 * Denna klass målar upp den del av menyn som visar upp highscore för olika banor. 
 */
public class HighscoreFrame extends Canvas{

	private double frameWidth, frameHeight;
	private boolean sendBackToMenu = false;
	private Image highscoreImage;
	private InputStream highscoreImageStream; 
	Font f1 = Font.font("Verdana", FontWeight.BOLD, 30);
	
	

	public HighscoreFrame(double frameWidth, double frameHeight) {
		setWidth(frameWidth);
		setHeight(frameHeight);
		this.frameWidth = frameWidth;
		this.frameHeight = frameHeight;
		
		try {
			highscoreImageStream = new FileInputStream("/home/masor844/Pictures/highscore.png");
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		highscoreImage = new Image(highscoreImageStream);

	}
	
 
	public void repaint(ArrayList<Integer> topFive) {

		GraphicsContext gc = getGraphicsContext2D();
		gc.setFill(Color.GREY);
		gc.fillRect(0, 0, frameWidth, frameHeight);
		gc.setFill(Color.BLACK);
		gc.setFont(f1);
		gc.drawImage(highscoreImage, 0, 100, 300, 300);
		for (int i = 0; i< 5; i++) {

			gc.fillText(Integer.toString(i+1) + ". " + topFive.get(i), 350,  125 + 70*i);
		}
	}
	
	
	public boolean getSentBackToMenu () {
		return sendBackToMenu;
	}
	public void resetSendBackToMenu() {
		sendBackToMenu = false; 
	}
	

}
