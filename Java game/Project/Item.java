package game;

import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;

/**
 * @author masor844 Item är en abstrakt klass som samtliga powerups ärver av.
 *         Den hanterar även viss funktionalitet som är samma oavsett powerup,
 *         som tex positionshantering.
 */
public abstract class Item extends Canvas {

	private int size;
	private Model model;
	private double currentXPos;
	private double currentYPos;

	// 1 = BiggerBall, 2 =
	public Item(Model model) {
		size = model.getItemSize();
		currentXPos = model.getCurrentXPosItem();
		currentYPos = model.getCurrentYPosItem();
		this.model = model;

	}

	public abstract void printYourself(GraphicsContext gc);

	public int getActivePowerUp() {
		return model.getActivePowerUp();
	}

	public double getXPosItem() {
		return currentXPos;
	}

	public double getYPosItem() {
		return currentYPos;
	}

	public double getSize() {
		return size;
	}

	public Model getModel() {
		return model;
	}

}
