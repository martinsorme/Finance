# Assignment 3, Lab 3 in course TDDE01,
# Machine Learning at Linkoping University, Sweden


########### Libraries #############
library(neuralnet)
########### Libraries #############


set.seed(1234567890)

var <- runif(500, 0, 10)
mydata <- data.frame(var, sin = sin(var))
tr <- mydata[1:25, ] # Training
te <- mydata[26:500, ] # Test

# Random initialization of the weights in the interval [-1, 1]
winit <- runif(31, -1, 1)


# Task 1, using default activation function (sigmoid)
nn <- neuralnet(sin ~ ., tr, hidden = 10, startweights = winit, act.fct = "logistic")

# Plot of the training data (black), test data (blue), and predictions (red)
plot(tr, cex = 2, xlab = "", ylab = "")
points(te, col = "blue", cex = 0.8)
points(te[, 1], predict(nn, te), col = "red", cex = 0.8)
legend("bottomright", c("train data", "test data", "predictions"),
       col = c("black", "blue", "red"), pch = 1, box.lty = 0,
       cex = 0.8, inset = c(0.01, 0.01))


# Task 2, Test with linear, ReLU and softplus as activation functions

# Linear activation function
linear <- function(x) x
nn.linear <- neuralnet(sin ~ ., data = tr, hidden = 10, startweights = winit, act.fct = linear)

plot(tr, cex = 2, xlab = "", ylab = "")
points(te, col = "blue", cex = 0.8)
points(te[, 1], predict(nn.linear, te), col = "green", cex = 0.8)
legend("bottomright", c("train data", "test data", "predictions"),
       col = c("black", "blue", "green"), pch = 1, box.lty = 0,
       cex = 0.8, inset = c(0.01, 0.01))

# ReLU activation function
ReLU <- function(x) ifelse(x > 0, x, 0)
nn.relu <- neuralnet(sin ~ ., data = tr, hidden = 10, startweights = winit, act.fct = ReLU)

plot(tr, cex = 2, xlab = "", ylab = "")
points(te, col = "blue", cex = 0.8)
points(te[, 1], predict(nn.relu, te), col = "green", cex = 0.8)
legend("bottomright", c("train data", "test data", "predictions"),
       col = c("black", "blue", "green"), pch = 1, box.lty = 0,
       cex = 0.8, inset = c(0.01, 0.01))

# Softplus activation function
softplus <- function(x) log(1 + exp(x))
nn.softplus <- neuralnet(sin ~ ., data = tr, hidden = 10, startweights = winit, act.fct = softplus)

plot(tr, cex = 2, xlab = "", ylab = "")
points(te, col = "blue", cex = 0.8)
points(te[, 1], predict(nn.softplus, te), col = "green", cex = 0.8)
legend("bottomright", c("train data", "test data", "predictions"),
       col = c("black", "blue", "green"), pch = 1, box.lty = 0,
       cex = 0.8, inset = c(0.01, 0.01))

#########################
######## Task 3 #########
#########################

# 500 sample points in the interval [0, 50]
var <- runif(500, 0, 50)
# Applying the sine function to each point
mydata <- data.frame(var, sin = sin(var))

# Visualize performance of predictions with nn learned in task 1
plot(mydata, cex = 2, xlab = "", ylab = "", ylim = c(-10, 2))
points(mydata[, 1], predict(nn, mydata[1]), col = "blue", cex = 0.8)

# Add legend to plot
legend("bottomleft", c("new sample data", "predictions"),
       col = c("black", "blue"), pch = 1, box.lty = 0,
       cex = 0.8, inset = c(0.01, 0.01))


# Task 4 - Theoretical
nn$weights

# Task 5 - Sample 500 points uniformly at random in the interval [0, 10], and
# apply the sine function to each point. Use all these points as training
# points for learning a NN that tries to predict x from sin(x).

var <- runif(500, 0, 10)
mydata <- data.frame(var, sin = sin(var))
data <- mydata[1:500, ]

nn <- neuralnet(var ~ ., data = mydata, hidden = 10, threshold = 0.1,
                startweights = winit, act.fct = "logistic")

# Visualize with plot
plot(data[, 2], data[, 1], cex = 2, xlab = "", ylab = "")
points(data[, 2], predict(nn, data), col = "green", cex = 0.8)

legend("bottomright", c("train data", "predictions"),
       col = c("black", "green"), pch = 1, box.lty = 0,
       cex = 0.8, inset = c(0.01, 0.01))