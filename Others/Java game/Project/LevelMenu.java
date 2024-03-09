package menu;

import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;

/**
 * @author masor844 Denna klass skriver ut vår meny med alla våra nivåer. Just
 *         nu går endast tre stycken av dem att spela.
 */
public class LevelMenu extends Canvas {

	private int position = 1;
	private int numberOfLevels = 6;
	private int currentRow;
	Font f1 = Font.font("Verdana", 25);
	Font f2 = Font.font("Verdana", 15);
	private int boxWidth = 50;
	private int boxHeight = 50;
	private Boolean sendBackToMainMenu = false; 
	private Boolean sendToLevel = false;
	private int numberOfRows = 3;
	private Color colorOfRow[] = { Color.GREEN, Color.BLUE, Color.DARKRED };

	public LevelMenu(double windowWidth, double windowHeight) {
		setWidth(windowWidth);
		setHeight(windowHeight);
		currentRow = 1;
		printAllLevels();
	}

	public void keyPressed(KeyEvent event) {
		if (event.getCode().equals(KeyCode.BACK_SPACE)) {
			sendBackToMainMenu = true;
		} else if (event.getCode().equals(KeyCode.RIGHT)) {
			if (position != 6) {
				position++;
				printAllLevels();
			}

		} else if (event.getCode().equals(KeyCode.LEFT)) {
			if (position != 1) {
				position--;
				printAllLevels();
			}
		} else if (event.getCode().equals(KeyCode.ENTER)) {
			sendToLevel = true;
		} else if (event.getCode().equals(KeyCode.DOWN)) {
			if (currentRow != 3) {
				currentRow++;
			}
			printAllLevels();
		} else if (event.getCode().equals(KeyCode.UP)) {
			if (currentRow != 1) {
				currentRow--;
			}

			printAllLevels();
		}

	}

	public void resetLevel(int i, int y) {
		GraphicsContext gc = getGraphicsContext2D();
		gc.setFill(Color.BLACK);
		gc.setFont(f2);

		gc.fillText("Level " + (i + (y - 1) * 6), 30 + (80 * (i - 1)), 90 + (150 * (y - 1)));
		gc.setFill(colorOfRow[y - 1]);
		gc.fillRect(30 + (80 * (i - 1)), 100 + (150 * (y - 1)), boxWidth, boxHeight);
	}

	public void printAllLevels() {
		GraphicsContext gc = getGraphicsContext2D();
		gc.clearRect(0, 0, getWidth(), getHeight());
		gc.setFill(Color.GREY);
		gc.fillRect(0, 0, getWidth(), getHeight());
		gc.setFont(f1);
		gc.setFill(Color.BLACK);
		gc.fillText("Select level", 30, 50);
		setMarked();
		for (int y = 1; y < numberOfRows + 1; ++y) {
			for (int i = 1; i < numberOfLevels + 1; ++i) {
				resetLevel(i, y);
			}
		}

	}

	public void setMarked() {
		GraphicsContext gc = getGraphicsContext2D();
		gc.setFill(Color.BLACK);
		gc.fillRect(25 + (80 * (position - 1)), 95 + ((currentRow - 1) * 150), boxWidth + 10, boxHeight + 10);
	}

	public Boolean getSendBackToMenu() {
		return sendBackToMainMenu;
	}

	public void resetSendBackToMainMenu() {
		sendBackToMainMenu = false;
	}

	public Boolean getSendToLevel() {
		return sendToLevel;
	}

	public void resetSendToLevel() {
		sendToLevel = false;
	}

	public int getLevel() {
		return position + (currentRow - 1) * 6;
	}

}
