package game;

import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;

/**
 * @author masor844 Klassen LivesPanel extendar Canvas och målar upp antalet liv
 *         på sidan av skärmen.
 */
public class LivesPanel extends Canvas {
	private Font f1 = Font.font("Verdana", FontWeight.BOLD, 13);

	public LivesPanel() {
		setWidth(50);
		setHeight(100);

		GraphicsContext gc = getGraphicsContext2D();
		gc.setFill(Color.BLACK);
		gc.fillRect(0, 0, getWidth(), getHeight());

	}

	public void printLives(int lives) {
		GraphicsContext gc = getGraphicsContext2D();
		gc.clearRect(0, 0, getWidth() - 8, getHeight() - 6);
		gc.setFill(Color.BLACK);
		gc.setFont(f1);
		gc.fillText("Lives", 2, 20);

		for (int counter = 0; counter < lives; counter++) {

			gc.setFill(Color.PURPLE);
			gc.fillOval(2 + (counter * 15), 30, 10, 10);

		}

	}

}
