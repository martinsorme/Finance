package projekt;

//import java.io.FileInputStream;

import javafx.animation.AnimationTimer;
import javafx.application.Application;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.control.Label;
//import javafx.scene.image.Image;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.HBox;
//import javafx.scene.layout.StackPane;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class Main extends Application {
	private double windowHeight = 600;
	private double windowWidth = 500;

	public static void main(String[] args) {
		launch(args);
	}

	public void start(Stage primaryStage) throws Exception {

		primaryStage.setTitle("Arkanoid");
		primaryStage.setWidth(windowWidth);
		primaryStage.setHeight(windowHeight);

		

		HBox mainLayout = new HBox();
		Model model = new Model();
		GameFrame frame = new GameFrame(model, 450, 600);
		VBox rightPanelFrame = new VBox(); 
		HighScore highscore = new HighScore(model);

		Label scoreText = new Label(" Score:\n " + model.getScore());

		rightPanelFrame.getChildren().add(scoreText);
		
		
		
		//RightPanelBox scoreBox = new RightPanelBox(); 
		

		// Set the target number of frames per second
		final double targetFps = 100.0;
		// Calculate frequency in nano seconds
		final double nanoPerUpdate = 1000000000.0 / targetFps;

		Scene gameScene = new Scene(mainLayout);

		gameScene.setOnKeyPressed(new EventHandler<KeyEvent>() {
			@Override
			public void handle(KeyEvent event) {
				// We send it on to the model, to handle it in the various
				// states of the game.
				model.keyPressed(event);
			}
		});

		/*
		 * StackPane root = new StackPane();
		 * 
		 * Image cover = new Image(new
		 * FileInputStream("/home/masor844/Pictures/index.jpeg")); BackgroundImage
		 * backGround = new BackgroundImage(cover, BackgroundRepeat.NO_REPEAT,
		 * BackgroundRepeat.NO_REPEAT, BackgroundPosition.DEFAULT,
		 * BackgroundSize.DEFAULT);
		 * 
		 * Background bGround = new Background(backGround); root.setBackground(bGround);
		 */

		mainLayout.getChildren().add(frame);
		
		rightPanelFrame.getChildren().add(highscore); 
		mainLayout.getChildren().add(rightPanelFrame); 
		

		primaryStage.setScene(gameScene);

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
					
					model.update();
					frame.repaint();
					lastUpdate = now;
				}
			}
		}.start(); // We start the timer.

		primaryStage.show();

	}

}

