package menu;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.Background;
import javafx.scene.layout.BackgroundFill;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.paint.Color;

/**
 * @author masor844 Denna klass hanterar ytterligare highscorefunktioner, och
 *         sorterar de olika highscores som finns.
 */
public class HighscoreMenu extends VBox {
	private boolean sendBackToMenu = false;
	ArrayList<Integer> topFive = new ArrayList<Integer>();

	public HighscoreMenu() {
		setWidth(500);
		setHeight(700);
		setStyle("-fx-background-color: #d4d6d5;");
		HighscoreFrame highScore = new HighscoreFrame(500, 530);
		getChildren().add(highScore);
		HBox h1 = new HBox();
		getChildren().add(h1);
		GoBackFromHighscoreButton button = new GoBackFromHighscoreButton(this);
		h1.setBackground(new Background(new BackgroundFill(Color.GREY, null, null)));

		h1.getChildren().add(button);

		try {
			sortHighScore();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		highScore.repaint(topFive);

	}

	public void keyPressed(KeyEvent event) {
		if (event.getCode().equals(KeyCode.BACK_SPACE)) {
			sendBackToMenu = true;
		}
	}

	public void setSendBackToMenu(boolean bool) {
		sendBackToMenu = bool;
	}

	public boolean getSentBackToMenu() {
		return sendBackToMenu;
	}

	public void sortHighScore() throws FileNotFoundException, IOException {

		Scanner fileInput;
		File inFile = new File("highscore.txt");

		try {
			fileInput = new Scanner(inFile);
			while (fileInput.hasNext()) {
				topFive.add(fileInput.nextInt());

			}
			fileInput.close();

		} catch (FileNotFoundException e) {
			System.out.println(e);
		}
		Collections.sort(topFive);
		Collections.reverse(topFive);

	}

}
