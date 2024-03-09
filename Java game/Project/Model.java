package game;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

import java.util.Random;

import javafx.geometry.Rectangle2D;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import menu.HighscoreMenu;

/**
 * @author masor844 Model är vår största klass, och hanterar flertalet
 *         funktioner i spelet, såsom hantering av powerups, tangentbord,
 *         "animationer" och kollisionshantering.
 */
public class Model {

	// Board:
	private double startXPosBoard = 200;
	private double currentXPosBoard;
	private double boardYPos = 550;
	private int score = 0;
	private double boardWidth;
	private double startingBoardWidth = 100;

	// Ball:
	private double currentXPosBall, currentYPosBall;
	private double startXFactor = 3;
	private double startYFactor = -3;
	private double xFactor;
	private double yFactor;
	private int ballSize;
	private int startingBallSize = 15;

	// Blocks and walls
	private Block block;
	private Rectangle2D rightWall;
	private Rectangle2D leftWall;
	private Rectangle2D roof;
	private Rectangle2D bottom;
	private ArrayList<Integer> startXPosBlock = new ArrayList<>();
	private ArrayList<Integer> startYPosBlock = new ArrayList<>();
	private int blockWidth;
	private int blockHeight;
	private int lives = 3;

	private LivesPanel livesPanel;
	private ScorePanel scorePanel;

	private int level;
	private boolean levelCompleted[] = { false, false, false };
	private int[] savedScoreForLevel = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
	private boolean runGame = false;
	private boolean youWin = false;
	private boolean youLose = false;
	private boolean gamePaused = false;
	private boolean sendBackToLevelMenu = false;

	// Powerups:
	private boolean powerUpActiveOnFrame = false;
	private boolean powerUpActiveForPlayer = false;
	private boolean flamingBallActive = false;
	private boolean smallerBallActive = false;
	private boolean biggerBoardActive = false;
	private int biggerBoardCounter = 0;
	private boolean fasterBallActive = false;
	private int activePowerUp;
	private double currentXPosItem;
	private double currentYPosItem;
	private int itemSize = 15;

	private int timerForPowerUp[] = { 0, 0, 0, 0, 0 };
	HighscoreMenu highscoreMenu;

	public Model(LivesPanel livesPanel, ScorePanel scorePanel, Block block, HighscoreMenu highscoreMenu) {
		this.livesPanel = livesPanel;
		this.scorePanel = scorePanel;
		this.highscoreMenu = highscoreMenu;
		this.block = block;
		blockWidth = block.getBlockWidth();
		blockHeight = block.getBlockHeight();
		ballSize = startingBallSize;
		boardWidth = startingBoardWidth;

		setStartXPosBoard();
		setStartPositionBall();
		livesPanel.printLives(lives);
		scorePanel.printScore(score);
		rightWall = new Rectangle2D(440, 0, 1, 600);
		leftWall = new Rectangle2D(5, 0, 1, 600);
		roof = new Rectangle2D(0, 0, 450, 1);
		bottom = new Rectangle2D(0, 600, 450, 1);

	}

	public void keyPressed(KeyEvent event) {
		if (!levelCompleted[level] && (event.getCode().equals(KeyCode.ENTER))) {
			runGame = true;
			if (!gamePaused) {
				xFactor = startXFactor;
				yFactor = startYFactor;
			}
			gamePaused = false;
			
		}

		if (!runGame) {
			if (event.getCode().equals(KeyCode.LEFT) && startXFactor != -5) {
				if (startXFactor - 1 == 0) {
					startXFactor = startXFactor - 2;
				} else {
					startXFactor--;
				}

			} else if (event.getCode().equals(KeyCode.RIGHT) && startXFactor != 5) {
				if (startXFactor + 1 == 0) {
					startXFactor = startXFactor + 2;
				} else {
					startXFactor++;
				}
			}

		}
		if (runGame) {
			if (event.getCode().equals(KeyCode.LEFT)) {
				if (currentXPosBoard != 5) {
					currentXPosBoard = currentXPosBoard - 15;
				}

			} else if (event.getCode().equals(KeyCode.RIGHT)) {
				if (currentXPosBoard + boardWidth != 450) {
					currentXPosBoard = currentXPosBoard + 15;
				}

			} else if (event.getCode().equals(KeyCode.ESCAPE)) {
				gamePaused = true;
			}
		}

		if (event.getCode().equals(KeyCode.BACK_SPACE) && !runGame && (lives == 3 || lives == 0 || youWin)) {

			sendBackToLevelMenu = true;
			setLives(3);
			setStartXPosBoard();
			setStartPositionBall();
			xFactor = startXFactor;
			yFactor = startYFactor;
			ballSize = startingBallSize;
			boardWidth = startingBoardWidth;
			score = 0;
			youLose = false;
			youWin = false;
			runGame = false;
			powerUpActiveOnFrame = false;
			powerUpActiveForPlayer = false;
			livesPanel.printLives(lives);
			scorePanel.printScore(score);

		}

	}

	public void update() {
		if (runGame && !gamePaused) {
			if (lives != 0) {
				gameHandling();
			} else {
				runGame = false;

			}
		} else if (!runGame && lives == 0) {
			youLose = true;
		}

	}

	// 0 = ballsize, 1 = speed, 2 = flamingball, 3 = biggerBoard
	public void timer(int powerUpNumber) {
		if (timerForPowerUp[powerUpNumber] == 500) {
			resetPowerUp(powerUpNumber);
			resetPowerUpFunction(powerUpNumber);
			timerForPowerUp[powerUpNumber] = 0;
		} else {
			timerForPowerUp[powerUpNumber]++;
		}
	}

	public void resetPowerUp(int powerUpNumber) {
		if (powerUpNumber == 0) {
			smallerBallActive = false;
		} else if (powerUpNumber == 1) {
			fasterBallActive = false;
		} else if (powerUpNumber == 2) {
			flamingBallActive = false;
		} else if (powerUpNumber == 3) {
			biggerBoardActive = false;
		}
	}

	public void resetPowerUpFunction(int powerUpNumber) {
		if (powerUpNumber == 0) {
			ballSize = startingBallSize;
		} else if (powerUpNumber == 1) {

			if (xFactor > 0) {
				if (startXFactor > 0) {
					xFactor = startXFactor;
				} else {
					xFactor = -startXFactor;
				}

			} else {
				if (startXFactor > 0) {
					xFactor = -startXFactor;
				} else {
					xFactor = startXFactor;
				}

			}
			if (yFactor > 0) {
				yFactor = -startYFactor;
			} else {
				yFactor = startYFactor;
			}
		} else if (powerUpNumber == 3) {
			currentXPosBoard = currentXPosBoard + 45 * biggerBoardCounter;
			boardWidth = boardWidth - 90 * biggerBoardCounter;
			biggerBoardCounter = 0;
		}
	}

	public void gameHandling() {

		if (startXPosBlock.isEmpty()) {
			runGame = false;
			youWin = true;
			setScoreForLevel(level);
			setLevelCompleted(level, true);
			saveHighscore(score);
		}

		Rectangle2D boardPos = new Rectangle2D(getCurrentXPosBoard(), getBoardYPos(), getBoardWidth(), 1);
		Rectangle2D ball = new Rectangle2D(currentXPosBall, currentYPosBall, ballSize, ballSize);

		ballHandling(ball, boardPos);
		blockHandling(ball);
		powerUpHandling(boardPos);

	}

	public void ballHandling(Rectangle2D ball, Rectangle2D boardPos) {
		if (ball.intersects(rightWall)) {
			currentXPosBall = currentXPosBall - Math.abs(xFactor);
			xFactor = xFactor * (-1);
		} else if (ball.intersects(leftWall)) {
			currentXPosBall = currentXPosBall + Math.abs(xFactor);
			xFactor = xFactor * (-1);
		} else if (ball.intersects(roof)) {
			currentYPosBall = currentYPosBall + Math.abs(yFactor);
			yFactor = yFactor * (-1);
		} else if (ball.intersects(boardPos)) {
			currentYPosBall = currentYPosBall - Math.abs(yFactor);
			yFactor = yFactor * (-1);

		} else if (ball.intersects(bottom)) {
			lives--;
			livesPanel.printLives(lives);
			setStartPositionBall();
			runGame = false;

		} else {
			currentXPosBall = currentXPosBall + xFactor;
			currentYPosBall = currentYPosBall + yFactor;

		}
	}

	public void blockHandling(Rectangle2D ball) {
		for (int i = 0; i < startXPosBlock.size(); ++i) {
			Rectangle2D tempLeft = new Rectangle2D(startXPosBlock.get(i), startYPosBlock.get(i), 1, blockHeight);
			Rectangle2D tempRight = new Rectangle2D(startXPosBlock.get(i) + blockWidth, startYPosBlock.get(i), 1,
					blockHeight);
			Rectangle2D tempTop = new Rectangle2D(startXPosBlock.get(i), startYPosBlock.get(i), blockWidth, 1);
			Rectangle2D tempBottom = new Rectangle2D(startXPosBlock.get(i), startYPosBlock.get(i) + blockHeight,
					blockWidth, 1);
			if (ball.intersects(tempTop) || ball.intersects(tempBottom) || ball.intersects(tempLeft)
					|| ball.intersects(tempRight)) {
				startXPosBlock.remove(i);
				startYPosBlock.remove(i);
				score = score + 100;
				scorePanel.printScore(score);

				int temp = randomNumberGenerator();
				if (temp == 0 && !powerUpActiveOnFrame) {
					activePowerUp = powerUpGenerator();
					powerUpActiveOnFrame = true;
					currentXPosItem = currentXPosBall;
					currentYPosItem = currentYPosBall;
				}

			}
			if (!flamingBallActive) {
				if (ball.intersects(tempRight)) {
					currentXPosBall = currentXPosBall + Math.abs(xFactor);
					xFactor = xFactor * (-1);

				} else if (ball.intersects(tempLeft)) {
					currentXPosBall = currentXPosBall - Math.abs(xFactor);
					xFactor = xFactor * (-1);

				} else if (ball.intersects(tempTop)) {
					currentYPosBall = currentYPosBall - Math.abs(yFactor);
					yFactor = yFactor * (-1);

				} else if (ball.intersects(tempBottom)) {
					currentYPosBall = currentYPosBall + Math.abs(yFactor);
					yFactor = yFactor * (-1);

				}
			}
		}
	}

	public void powerUpHandling(Rectangle2D boardPos) {
		if (powerUpActiveOnFrame) {
			Rectangle2D powerUp = new Rectangle2D(currentXPosItem, currentYPosItem, itemSize, itemSize);
			if (boardPos.intersects(powerUp)) {
				score = score + 50;
				if (activePowerUp == 0) {
					ballSize = ballSize / 2;
					smallerBallActive = true;
				} else if (activePowerUp == 1) {
					xFactor = xFactor * 1.5;
					yFactor = yFactor * 1.5;
					fasterBallActive = true;

				} else if (activePowerUp == 2) {
					flamingBallActive = true;
				} else if (activePowerUp == 3) {
					currentXPosBoard = currentXPosBoard - 45;
					boardWidth = boardWidth + 90;
					biggerBoardActive = true;
					biggerBoardCounter++;
				}

				powerUpActiveOnFrame = false;
				powerUpActiveForPlayer = true;
			} else if (powerUp.intersects(bottom)) {
				powerUpActiveOnFrame = false;
			}
			currentYPosItem = currentYPosItem + 3;

		}

		if (smallerBallActive) {
			timer(0);
		}
		if (fasterBallActive) {
			timer(1);
		}
		if (flamingBallActive) {
			timer(2);
		}
		if (biggerBoardActive) {
			timer(3);
		}
	}

	private int randomNumberGenerator() {
		Random r = new Random();
		int randomNumber = r.nextInt(2);
		return randomNumber;
	}

	private int powerUpGenerator() {
		Random r = new Random();
		int powerUpNumber = r.nextInt(4);
		return powerUpNumber;
	}

	public void setStartXPosBoard() {
		currentXPosBoard = startXPosBoard;
	}

	public double getCurrentXPosBoard() {
		return currentXPosBoard;
	}

	public double getBoardWidth() {
		return boardWidth;
	}
	
	public double getStartYFactor() {
		return startYFactor; 
	}

	public double getBoardYPos() {
		return boardYPos;
	}

	public void setStartPositionBall() {
		currentXPosBall = currentXPosBoard + boardWidth / 2;
		currentYPosBall = boardYPos - ballSize;
	}

	public double getCurrentXPosBall() {
		return currentXPosBall;
	}

	public double getCurrentYPosBall() {
		return currentYPosBall;
	}

	public int getScore() {
		return score;
	}

	public int getLives() {
		return lives;
	}

	public void setLives(int i) {
		lives = i;
	}

	public ArrayList<Integer> getXPosBlock() {
		return startXPosBlock;
	}

	public ArrayList<Integer> getYPosBlock() {
		return startYPosBlock;
	}

	public void setLevel(int i) {
		level = i - 1;
		if (i == 1) {
			startXPosBlock = block.getLevelXPosBlock(1);
			startYPosBlock = block.getLevelYPosBlock(1);
		} else if (i == 2) {
			startXPosBlock = block.getLevelXPosBlock(2);
			startYPosBlock = block.getLevelYPosBlock(2);
		} else if (i == 3) {
			startXPosBlock = block.getLevelXPosBlock(3);
			startYPosBlock = block.getLevelYPosBlock(3);
		} else if (i == 4) {

		}
	}

	public Boolean getSendBackToLevelMenu() {
		return sendBackToLevelMenu;
	}

	public void setSendBackToLevelMenu(boolean bool) {
		sendBackToLevelMenu = bool;
	}

	public Boolean getGameRunning() {
		return runGame;
	}

	public double getCurrentXPosItem() {
		return currentXPosItem;
	}

	public double getCurrentYPosItem() {
		return currentYPosItem;
	}

	public int getItemSize() {
		return itemSize;
	}

	public Boolean getPowerUpActiveOnFrame() {
		return powerUpActiveOnFrame;
	}

	public int getBallSize() {
		return ballSize;
	}

	public int getActivePowerUp() {
		return activePowerUp;
	}

	public double getStartXFactor() {
		return startXFactor;
	}

	public boolean getYouWin() {
		return youWin;
	}

	public void setYouWin(boolean bool) {
		youWin = bool;
	}

	public boolean getYouLose() {
		return youLose;
	}

	public boolean getGamePaused() {
		return gamePaused;
	}

	public void setLevelCompleted(int level, boolean bool) {
		levelCompleted[level] = bool;
	}

	public boolean getLevelCompleted(int level) {
		return levelCompleted[level];
	}

	public int getLevel() {
		return level;
	}

	public void setScoreForLevel(int level) {
		savedScoreForLevel[level] = score;
	}

	public int getScoreForLevel(int level) {
		return savedScoreForLevel[level];
	}

	public void saveHighscore(int score) {
		try {

			FileWriter myWriter = new FileWriter("highscore.txt", true);
			myWriter.write(score + "\n");
			myWriter.flush();
			myWriter.close();
			// System.out.println("Successfully wrote to the file:" + score);
		} catch (IOException e) {
			System.out.println("An error occurred.");
			e.printStackTrace();
		}
	}
}
