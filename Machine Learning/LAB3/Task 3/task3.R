library(neuralnet)

### TASK 1 ###

set.seed(1234567890)

Var <- runif(500, 0, 10)

mydata <- data.frame(Var, Sin=sin(Var))

tr <- mydata[1:25,] # Training
te <- mydata[26:500,] # Test

# Random initialization of the weights in the interval [-1, 1]
winit <- runif(10, -1, 1)

nn <- neuralnet(Sin ~ Var, data = tr, hidden = c(1000), startweights = winit)
    
# Plot of the training data (black), test data (blue), and predictions (red)
plot(tr, main="sigmoid", cex=2)
points(te, col = "blue", cex=1)
points(te[,1],predict(nn,te), col="red", cex=1)
legend("topright", legend = c("Training Data", "Test Data", "Predictions"),
       col = c("black", "blue", "red"), pch = 16)

### TASK 2 ###

# Custom activation function: h1(x) = x
linear <- function(x) x
nn_linear <- neuralnet(Sin ~ Var, data = tr, hidden = 10, startweights = winit, act.fct = linear)

# Plot same way as earlier
plot(tr, main = "linear", cex=2)
points(te, col = "blue", cex=1)
points(te[,1],predict(nn_linear,te), col="red", cex=1)
legend("topright", legend = c("Training Data", "Test Data", "Predictions"),
       col = c("black", "blue", "red"), pch = 16)

# Custom activation function: h2(x) = max{0, x}
ReLU <- function(x) ifelse(x>0, x, 0)
nn_ReLU <- neuralnet(Sin ~ Var, data = tr, hidden = 10, startweights = winit, act.fct = ReLU)

# Plot same way as earlier
plot(tr, main = "ReLU", cex=2)
points(te, col = "blue", cex=1)
points(te[,1],predict(nn_ReLU,te), col="red", cex=1)
legend("topright", legend = c("Training Data", "Test Data", "Predictions"),
       col = c("black", "blue", "red"), pch = 16)

# Custom activation function: h3(x) = ln(1 + exp x)
softplus <- function(x) log(1 + exp(x))
nn_softplus <- neuralnet(Sin ~ Var, data = tr, hidden = 10, startweights = winit, act.fct = softplus)

# Plot same way as earlier
plot(tr, main = "softplus", cex=2)
points(te, col = "blue", cex=1)
points(te[,1],predict(nn_softplus,te), col="red", cex=1)
legend("topright", legend = c("Training Data", "Test Data", "Predictions"),
       col = c("black", "blue", "red"), pch = 16)

### TASK 3 ###

set.seed(1234567890)
Var <- runif(500, 0, 50)
mydata_50 <- data.frame(Var, Sin=sin(Var))

plot(mydata_50, cex = 2, ylim = c(-10, 2))
points(mydata_50[, 1], predict(nn, mydata_50), col = "red", cex = 1)
legend("topright", legend = c("Training", "Predictions"),
       col = c("black", "red"), pch = 16)

### TASK 4 ###
plot(nn)
nn$weights

### TASK 5 ###

set.seed(1234567890)

Var_inverse <- runif(500, 0, 10)

mydata_inverse <- data.frame(Sin_inverse=sin(Var_inverse), Var_inverse)

nn_inverse <- neuralnet(Var_inverse ~ Sin_inverse, data = mydata_inverse, hidden = 10, threshold = 0.1)

plot(mydata_inverse, main="inverse", cex=2)
points(mydata_inverse[, 1],predict(nn_inverse, mydata_inverse), col="red", cex=1)

legend("topright", legend = c("Training Data", "Predictions"),
       col = c("black", "red"), pch = 16)

