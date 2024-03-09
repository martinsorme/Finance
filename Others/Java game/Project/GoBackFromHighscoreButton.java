package menu;

import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;

/**
 * @author masor844 Denna klass implementerades för att visa förståelse på
 *         hantering av klickande med mus.
 */
public class GoBackFromHighscoreButton extends Canvas {
	Font f1 = Font.font("Verdana", FontWeight.BOLD, 15);

	public GoBackFromHighscoreButton(HighscoreMenu highscoreMenu) {

		setWidth(80);
		setHeight(70);

		GraphicsContext gc = getGraphicsContext2D();
		gc.setFill(Color.BLACK);
		gc.fillRect(0, 0, getWidth(), getHeight());
		gc.setFill(Color.GREY);
		gc.setFont(f1);
		gc.fillText("Go back", 0, 15);

		setOnMouseClicked(event -> {
			highscoreMenu.setSendBackToMenu(true);
		});
	}

}
