package game;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;

/**
 * @author masor844 Vår boll-klass, som skriver ut sig själv på skärmen. Bollen
 *         finns med hela tiden i spelet, så mycket annat behövdes inte i denna
 *         klass.
 */
public class Ball {

	public Ball() {
	}

	public void printYourself(GraphicsContext gc, double xPos, double yPos, int ballSize) {
		gc.setFill(Color.PURPLE);
		gc.fillOval(xPos, yPos, ballSize, ballSize);
	}

}
