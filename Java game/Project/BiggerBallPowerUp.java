package game;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;

//smaller
/**
 * @author masor844 Denna klass skriver ut en powerup med syftet att ändra
 *         bollens storlek.
 */
public class BiggerBallPowerUp extends Item {

	public BiggerBallPowerUp(Model model) {
		super(model);
	}

	@Override
	public void printYourself(GraphicsContext gc) {
		if (getActivePowerUp() == 0) {
			gc.setFill(Color.RED);
			gc.fillOval(getXPosItem(), getYPosItem(), getSize(), getSize());

		}

	}
}
