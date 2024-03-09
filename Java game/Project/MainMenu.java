package menu;

import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;

/**
 * @author masor844 Denna klass hanterar vår meny som man först når när man
 *         startar spelet.
 */
public class MainMenu extends Canvas {

	private int position = 1;
	private int boxWidth = 150;
	private int boxHeight = 50;
	private double frameWidth, frameHeight;
	// private Boolean sendToPlay = false;
	private Boolean sendToHighscore = false;
	private Boolean sendToQuit = false;
	private Boolean sendToLevelMenu = false;
	Font f1 = Font.font("Verdana", FontWeight.EXTRA_BOLD, 80);
	Font f2 = Font.font("Verdana", FontWeight.EXTRA_BOLD, 23);

	public MainMenu(double frameWidth, double frameHeight) {
		setWidth(frameWidth);
		setHeight(frameHeight);
		this.frameWidth = frameWidth;
		this.frameHeight = frameHeight;
		paintBoxes();

	}

	public void keyPressed(KeyEvent event) {

		if (event.getCode().equals(KeyCode.DOWN)) {
			if (position != 3) {
				position++;
			} else {
				position = 1;
			}

		} else if (event.getCode().equals(KeyCode.UP)) {
			if (position != 1) {
				position--;
			} else {
				position = 3;
			}

		} else if (event.getCode().equals(KeyCode.ENTER)) {
			if (position == 1) {
				sendToLevelMenu = true;
			} else if (position == 2) {
				sendToHighscore = true;
			} else if (position == 3) {
				sendToQuit = true;
			}
		}

		paintBoxes();

	}

	public void paintBoxes() {
		GraphicsContext gc = getGraphicsContext2D();
		gc.clearRect(0, 0, frameWidth, frameHeight);
		gc.setFill(Color.GREY);
		gc.fillRect(0, 0, frameWidth, frameHeight);
		gc.setFont(f1);
		gc.setFill(Color.DARKRED);
		gc.fillText("ARKANOID", frameWidth / 2 - 235, 125);
		setMarked();
		gc.setFill(Color.BLACK);
		gc.fillRect(frameWidth / 2 - boxWidth / 2 - 3, 197, boxWidth + 6, boxHeight + 6);
		gc.fillRect(frameWidth / 2 - boxWidth / 2 - 3, 297, boxWidth + 6, boxHeight + 6);
		gc.fillRect(frameWidth / 2 - boxWidth / 2 - 3, 397, boxWidth + 6, boxHeight + 6);
		gc.setFill(Color.BLUE);
		gc.fillRect(frameWidth / 2 - boxWidth / 2, 200, boxWidth, boxHeight);
		gc.fillRect(frameWidth / 2 - boxWidth / 2, 300, boxWidth, boxHeight);
		gc.fillRect(frameWidth / 2 - boxWidth / 2, 400, boxWidth, boxHeight);
		gc.setFill(Color.AZURE);
		gc.setFont(f2);
		gc.fillText("Start", frameWidth / 2 - 30, 230);
		gc.fillText("Highscore", frameWidth / 2 - 60, 335);
		gc.fillText("Quit game", frameWidth / 2 - 65, 430);
	}

	public void setMarked() {
		GraphicsContext gc = getGraphicsContext2D();
		gc.setFill(Color.BLACK);
		gc.fillRect((frameWidth / 2) - (boxWidth / 2) - 5, 100 + (position * 100) - 5, boxWidth + 10, boxHeight + 10);
		;
	}

	public int getAction() {
		return position;
	}

	public Boolean getSendToQuitGame() {
		return sendToQuit;
	}

	public Boolean getSendToHighscore() {
		return sendToHighscore;
	}

	public Boolean getSendToLevelMenu() {
		return sendToLevelMenu;
	}

	public void resetSendToHighscore() {
		sendToHighscore = false;
	}

	public void resetSendToLevelMenu() {
		sendToLevelMenu = false;
	}

}
