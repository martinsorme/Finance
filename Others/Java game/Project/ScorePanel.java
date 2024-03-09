package game;

import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;

/**
 * @author masor844 ScorePanel skriver ut vår score på Canvas.
 */
public class ScorePanel extends Canvas {
	private Font f1 = Font.font("Verdana", FontWeight.BOLD, 13);

	public ScorePanel() {
		setWidth(50);
		setHeight(100);
		GraphicsContext gc = getGraphicsContext2D();
		gc.setFill(Color.BLACK);
		gc.fillRect(0, 0, getWidth(), getHeight());

	}

	public void printScore(int score) {

		GraphicsContext gc = getGraphicsContext2D();
		gc.clearRect(0, 3, getWidth() - 8, getHeight() - 6);
		gc.setFont(f1);
		gc.setFill(Color.BLACK);
		gc.fillText("Score", 2, 20);

		gc.fillText(Integer.toString(score), 5, getHeight() / 2);

	}

}
