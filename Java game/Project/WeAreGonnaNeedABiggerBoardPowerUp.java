package game;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;

/**
 * @author masor844 Denna klass printar ut en powerup som gör plattan större.
 */
public class WeAreGonnaNeedABiggerBoardPowerUp extends Item {

	public WeAreGonnaNeedABiggerBoardPowerUp(Model model) {
		super(model);
	}

	public void printYourself(GraphicsContext gc) {
		if (getActivePowerUp() == 3) {
			gc.setFill(Color.ORANGE);
			gc.fillOval(getXPosItem(), getYPosItem(), getSize(), getSize());

		}

	}

}
