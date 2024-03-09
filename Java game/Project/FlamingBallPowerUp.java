package game;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;

/**
 * @author masor844 Denna klass skriver ut en powerup som tar bort
 *         kollisionshanteringen för blocken under en viss tid.
 */
public class FlamingBallPowerUp extends Item {

	public FlamingBallPowerUp(Model model) {
		super(model);
	}

	@Override
	public void printYourself(GraphicsContext gc) {
		if (getActivePowerUp() == 2) {
			gc.setFill(Color.FIREBRICK);
			gc.fillOval(getXPosItem(), getYPosItem(), getSize(), getSize());

		}

	}
}
