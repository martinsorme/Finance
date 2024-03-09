package game;

import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.image.Image;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.FontWeight;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayList;

/**
 * @author masor844 Klassen GameFrame målar upp de nivåer vi befinner oss i, och
 *         hanterar även de meddelanden som dyker upp på skärmen under nivåns
 *         gång.
 * 
 */
public class GameFrame extends Canvas {

	private double frameWidth, frameHeight;
	private Model model;
	private ArrayList<Integer> counter = new ArrayList<>();
	Font f1 = Font.font("Verdana", FontWeight.EXTRA_BOLD, 20);
	private Image boardImage;
	private InputStream boardStream;
	private Image blockImage;
	private InputStream blockStream;
	private Image fireImage;
	private InputStream fireStream;

	public GameFrame(Model model, double frameWidth, double frameHeight) {
		this.frameWidth = frameWidth;
		this.frameHeight = frameHeight;
		this.model = model;
		try {
			boardStream = new FileInputStream("/home/masor844/Pictures/newBoard.jpg");
			blockStream = new FileInputStream("/home/masor844/Pictures/newBlock.png");
			fireStream = new FileInputStream("/home/masor844/Pictures/fireEmoji.jpg");
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		boardImage = new Image(boardStream);
		blockImage = new Image(blockStream);
		fireImage = new Image(fireStream);

		setHeight(frameHeight);
		setWidth(frameWidth);
		GraphicsContext gc = getGraphicsContext2D();
		gc.setFill(Color.BLACK);
		// Här sätts "kanterna" på spelplanen ut
		// Höger
		gc.fillRect(frameWidth - 5, 0, 5, frameHeight);
		// Vänster
		gc.fillRect(0, 0, 5, frameHeight);

	}

	public void repaint() {

		GraphicsContext gc = getGraphicsContext2D();

		gc.clearRect(5, 0, frameWidth - 10, frameHeight);

		gc.setFont(f1);
		gc.setFill(Color.BLACK);
		gc.fillArc(model.getCurrentXPosBall(), model.getCurrentYPosBall(), 4, 30, 40, 100, null);
		if (!model.getLevelCompleted(model.getLevel())) {
			if (model.getYouLose()) {
				gc.fillText("You lose :(", 10, 300);
			}
			if (model.getYouWin()) {
				gc.fillText("A winner is you", 10, 300);
			}
			if (!model.getGameRunning()) {
				if (!model.getYouLose() && model.getLives() != 3 && !model.getYouWin()) {
					gc.fillText("Press ENTER to start\nYour angle is: " + 15*model.getStartXFactor(), 10, 300);
				} else if (!model.getYouWin() && !model.getYouLose()) {
					gc.fillText("Press ENTER to start\nPress BACKSPACE to go back\nYour angle is: "
							+ 15*model.getStartXFactor(), 10, 300);
				}
			}
			if (model.getGamePaused()) {

				gc.fillText("GAME PAUSED, press ENTER to continue", 10, 300);
			}
		} else {
			gc.fillText("A winner is you\nScore: " + model.getScoreForLevel(model.getLevel())
					+ "\nPress backspace to go back", 10, 300);
		}

		Board board = new Board();
		board.printYourself(gc, model.getCurrentXPosBoard(), model.getBoardWidth(), model.getBoardYPos());

		

		if (model.getPowerUpActiveOnFrame()) {
			if (model.getActivePowerUp() == 0) {
				Item item = new BiggerBallPowerUp(model);
				item.printYourself(gc);
			} else if (model.getActivePowerUp() == 1) {
				Item item = new FasterBallPowerUp(model);
				item.printYourself(gc);

			} else if (model.getActivePowerUp() == 2) {
				gc.drawImage(fireImage, model.getCurrentXPosItem(), model.getCurrentYPosItem(), 30, 30);
			} else if (model.getActivePowerUp() == 3) {
				Item item = new WeAreGonnaNeedABiggerBoardPowerUp(model);
				item.printYourself(gc);
			}

		}
		
		counter = model.getXPosBlock();
		for (int i = 0; i < counter.size(); ++i) {
			gc.drawImage(blockImage, model.getXPosBlock().get(i), model.getYPosBlock().get(i), 60, 30);
		}

		Ball ball = new Ball();
		ball.printYourself(gc, model.getCurrentXPosBall(), model.getCurrentYPosBall(), model.getBallSize());

		gc.drawImage(boardImage, model.getCurrentXPosBoard(), model.getBoardYPos(), model.getBoardWidth(), 10);

	}

}
