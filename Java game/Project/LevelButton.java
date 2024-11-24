package menu;

import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;

/**
 * @author masor844 Denna klass är till för de knappar som finns för våra
 *         nivåer.
 */
public class LevelButton extends Canvas {
	private int level;

	public LevelButton(int level) {
		this.level = level;
		setWidth(50);
		setHeight(50);
		reset();

		setOnMouseDragOver(event -> {
			reset();
			setMarked();
		});

		setOnMouseClicked(event -> {
			System.out.println("Hej");
		});
	}

	public void setMarked() {

	}

	public void reset() {
		GraphicsContext gc = getGraphicsContext2D();

		gc.setFill(Color.BLACK);

		gc.fillRect(0, 0, getWidth(), getHeight());
		gc.setFill(Color.RED);
		gc.fillText("Level " + level, 0, 15);
	}

}
