package game;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;

/**
 * @author masor844 Klassen Board, likt Ball, ser till att skriva ut sig själv
 *         under spelets gång.
 */
public class Board {

	public Board() {

	}

	public void printYourself(GraphicsContext gc, double xPos, double width, double yPos) {
		gc.setFill(Color.BLUE);
		gc.fillRect(xPos, yPos, width, 10);
	}

}
