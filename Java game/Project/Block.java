package game;

import javafx.scene.canvas.GraphicsContext;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Random;

import javafx.scene.canvas.Canvas;
import javafx.scene.paint.Color;

/**
 * @author masor844 Klassen Block skapar de blocks som finns för varje nivå och
 *         har även modeller som returnerar höjd och bredd på dessa block.
 */
public class Block extends Canvas {

	private ArrayList<Integer> startXPosBlock1 = new ArrayList<>();
	private ArrayList<Integer> startYPosBlock1 = new ArrayList<>();
	private ArrayList<Integer> startXPosBlock2 = new ArrayList<>();
	private ArrayList<Integer> startYPosBlock2 = new ArrayList<>();
	private ArrayList<Integer> startXPosBlock3 = new ArrayList<>();
	private ArrayList<Integer> startYPosBlock3 = new ArrayList<>();
	private Color[] blockColor = { Color.BLUE, Color.RED, Color.AZURE, Color.DARKGOLDENROD };
	private int width = 60;
	private int height = 30;

	public Block() {
		Collections.addAll(startXPosBlock1, 20, 100, 180, 260, 340, 100, 180, 260, 180);
		Collections.addAll(startYPosBlock1, 20, 20, 20, 20, 20, 80, 80, 80, 140);

		Collections.addAll(startXPosBlock2, 20, 100, 180, 260, 340, 20, 100, 180, 260, 340, 20, 100, 180, 260, 340, 20,
				100, 180, 260, 340);
		Collections.addAll(startYPosBlock2, 20, 20, 20, 20, 20, 80, 80, 80, 80, 80, 140, 140, 140, 140, 140, 200, 200,
				200, 200, 200);

		Collections.addAll(startXPosBlock3, 20);
		Collections.addAll(startYPosBlock3, 20);

	}

	public int colorGenerator() {
		Random random = new Random();
		int randomNumber = random.nextInt(4);
		return randomNumber;
	}

	public Color getBlockColor() {
		return blockColor[colorGenerator()];
	}

	public void printYourself(GraphicsContext gc, double xPos, double yPos) {

		// gc.setFill(getBlockColor());
		gc.setFill(Color.BLACK);
		gc.fillRect(xPos, yPos, width, height);

	}

	public ArrayList<Integer> getLevelXPosBlock(int level) {
		if (level == 1) {
			return startXPosBlock1;
		} else if (level == 2) {
			return startXPosBlock2;
		} else if (level == 3) {
			return startXPosBlock3;
		} else {
			return null;
		}
	}

	public ArrayList<Integer> getLevelYPosBlock(int level) {
		if (level == 1) {
			return startYPosBlock1;
		} else if (level == 2) {
			return startYPosBlock2;
		} else if (level == 3) {
			return startYPosBlock3;
		} else {
			return null;
		}
	}

	public int getBlockWidth() {
		return width;
	}

	public int getBlockHeight() {
		return height;
	}

}
