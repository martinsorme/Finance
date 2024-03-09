package game;

import javafx.animation.AnimationTimer;
import javafx.application.Application;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.HBox;
import javafx.stage.Stage;
import menu.HighscoreMenu;
import menu.LevelMenu;
import menu.MainMenu;

/**
 * @author masor844 Klassen main sköter alla states i spelet.
 *
 */
public class Main extends Application {
	private double windowHeight = 600;
	private double windowWidth = 500;
	private int state = 0;

	public static void main(String[] args) {
		launch(args);

	}

	public void start(Stage primaryStage) throws Exception {

		primaryStage.setTitle("Arkanoid");
		primaryStage.setWidth(windowWidth);
		primaryStage.setHeight(windowHeight);

		LivesPanel lives = new LivesPanel();
		ScorePanel scorePanel = new ScorePanel();

		Block block = new Block();

		HighscoreMenu highscoreMenu = new HighscoreMenu();

		HBox mainLayout = new HBox();
		Model model = new Model(lives, scorePanel, block, highscoreMenu);
		GameFrame gameFrame = new GameFrame(model, 450, 600);
		VerticalPanel rightPanelFrame = new VerticalPanel();

		HBox menuFrame = new HBox();
		MainMenu mainMenu = new MainMenu(500, 600);

		HBox levelFrame = new HBox();
		LevelMenu levelMenu = new LevelMenu(500, 600);

		menuFrame.getChildren().add(mainMenu);
		levelFrame.getChildren().add(levelMenu);

		rightPanelFrame.getChildren().add(scorePanel);
		rightPanelFrame.getChildren().add(lives);

		// Set the target number of frames per second
		final double targetFps = 100.0;
		// Calculate frequency in nano seconds
		final double nanoPerUpdate = 1000000000.0 / targetFps;

		Scene gameScene = new Scene(mainLayout);
		Scene menuScene = new Scene(menuFrame);
		Scene highscoreScene = new Scene(highscoreMenu);
		Scene levelScene = new Scene(levelFrame);

		gameScene.setOnKeyPressed(new EventHandler<KeyEvent>() {
			@Override
			public void handle(KeyEvent event) {
				model.keyPressed(event);
			}
		});

		menuScene.setOnKeyPressed(new EventHandler<KeyEvent>() {
			@Override
			public void handle(KeyEvent event) {
				mainMenu.keyPressed(event);
			}
		});

		highscoreScene.setOnKeyPressed(new EventHandler<KeyEvent>() {
			@Override
			public void handle(KeyEvent event) {
				highscoreMenu.keyPressed(event);

			}

		});

		levelScene.setOnKeyPressed(new EventHandler<KeyEvent>() {
			@Override
			public void handle(KeyEvent event) {
				levelMenu.keyPressed(event);
			}
		});

		mainLayout.getChildren().add(gameFrame);

		mainLayout.getChildren().add(rightPanelFrame);

		new AnimationTimer() {
			long lastUpdate = 0;

			// This method will be called
			public void handle(long now) {
				// Perform game update and game rendering. This will
				// execute approximately 60 times per second, or as
				// close to that as possible. Can vary greatly between systems.
				// If we want closer control we use something like the
				// if-statement below to control frame rate.
				if ((now - lastUpdate) > nanoPerUpdate) {

					if (state == 0) {
						primaryStage.setScene(menuScene);
						Boolean quitTemp = mainMenu.getSendToQuitGame();
						Boolean levelTemp = mainMenu.getSendToLevelMenu();
						Boolean highscoreTemp = mainMenu.getSendToHighscore();

						if (levelTemp) {
							state = 3;
							mainMenu.resetSendToLevelMenu();
						} else if (highscoreTemp) {
							state = 1;
							mainMenu.resetSendToHighscore();
						} else if (quitTemp) {
							primaryStage.close();
						}
					} else if (state == 1) {
						primaryStage.setScene(highscoreScene);
						if (highscoreMenu.getSentBackToMenu()) {
							state = 0;
							highscoreMenu.setSendBackToMenu(false);
						}

					} else if (state == 2) {
						primaryStage.setScene(gameScene);
						if (model.getSendBackToLevelMenu()) {
							state = 3;
							model.setSendBackToLevelMenu(false);
						}
						model.update();
						gameFrame.repaint();

					} else if (state == 3) {
						primaryStage.setScene(levelScene);
						if (levelMenu.getSendBackToMenu()) {
							state = 0;
							levelMenu.resetSendBackToMainMenu();
						} else if (levelMenu.getSendToLevel()) {
							model.setLevel(levelMenu.getLevel());
							state = 2;
							levelMenu.resetSendToLevel();

						}
					}
					lastUpdate = now;
				}
			}

		}.start(); // We start the timer.
		primaryStage.show();

	}

}
