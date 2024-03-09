package game;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;

/**
 * @author masor844 Denna klass skriver ut en powerup vars syfte är att öka
 *         bollens fart.
 */
public class FasterBallPowerUp extends Item {

	public FasterBallPowerUp(Model model) {
		super(model);
	}

	@Override
	public void printYourself(GraphicsContext gc) {
		if (getActivePowerUp() == 1) {
			gc.setFill(Color.AQUA);
			gc.fillOval(getXPosItem(), getYPosItem(), getSize(), getSize());

		}

	}
}
