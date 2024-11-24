#####TASK1#####
rm(list = ls())

data = read.csv("optdigits.csv", header = FALSE)
n=dim(data)[1]

set.seed(12345)
id=sample(1:n, floor(n*0.5))
train=data[id,]

id1=setdiff(1:n, id)
set.seed(12345)
id2=sample(id1, floor(n*0.25))
validation=data[id2,]
id3=setdiff(id1,id2)

test=data[id3,]


#####TASK2#####
library(kknn)

# Convert the outcome variable to a factor
train$V65 <- as.factor(train$V65)
test$V65 <- as.factor(test$V65)

# Fitting 30-nearest neighbor classifier on training data
model_train <- kknn(V65 ~ ., train = train, test = train, k = 30, kernel = "rectangular")

# Fitting 30-nearest neighbor classifier on test data
model_test <- kknn(V65 ~ ., train = train, test = test, k = 30, kernel = "rectangular")

# Making predictions on training and test data
prediction_train <- predict(model_train)
prediction_test <- predict(model_test)

# Confusion matrices
cm_train <- table(prediction_train, train$V65)
cm_test <- table(prediction_test, test$V65)

# Computing misclassification rates from confusion matrices
misclass_train <- 1 - sum(diag(cm_train)) / sum(cm_train)
misclass_test  <- 1 - sum(diag(cm_test)) / sum(cm_test)

# Displaying results
print("Confusion Matrix for Training Data:")
print(cm_train)

print("Confusion Matrix for Test Data:")
print(cm_test)

print(paste("Misclassification Rate for Training Data:", misclass_train))
print(paste("Misclassification Rate for Test Data:", misclass_test))

##Comment on the quality of predictions for different digits and on the overall
##prediction quality
#Ans: Overall good. ~95% accuracy. 0.045 vs. 0.048 miss class. Surprisingly similar considering one had same data for test and train.













#####TASK3#####
# Indices of training data that are labeled as 8
actual_eights <- which(train$V65 == 8)

# Extract probabilities guessing 8 for each image in the train data.
prob_8 <- model_train$prob[actual_eights, 8]

# Easiest cases
easiest_cases <- order(prob_8, decreasing = TRUE)
easiest_cases <- easiest_cases[1:2]

# Hardest cases
hardest_cases <- order(prob_8)
hardest_cases <- hardest_cases[1:3]

# Extract the easiest and hardest features from the train data
easiest_cases_data <- train[easiest_cases, ]
hardest_cases_data <- train[hardest_cases, ]

# Remove last column and reshape into 8x8 numeric matrix
easiest_case_1_matrix <- matrix(as.numeric(easiest_cases_data[1, -65]), nrow = 8, ncol = 8)
easiest_case_2_matrix <- matrix(as.numeric(easiest_cases_data[2, -65]), nrow = 8, ncol = 8)

# Plot in heatmaps
heatmap(t(easiest_case_1_matrix), Colv = "Rowv", Rowv = NA)
heatmap(t(easiest_case_2_matrix), Colv = "Rowv", Rowv = NA)

# Remove last column and reshape into 8x8 numeric matrix
hardest_cases_1 <- matrix(as.numeric(hardest_cases_data[1, -65]), nrow = 8, ncol = 8)
hardest_cases_2 <- matrix(as.numeric(hardest_cases_data[2, -65]), nrow = 8, ncol = 8)
hardest_cases_3 <- matrix(as.numeric(hardest_cases_data[3, -65]), nrow = 8, ncol = 8)

# Plot in heatmaps
heatmap(t(hardest_cases_1), Colv = "Rowv", Rowv = NA)
heatmap(t(hardest_cases_2), Colv = "Rowv", Rowv = NA)
heatmap(t(hardest_cases_3), Colv = "Rowv", Rowv = NA)

##Comment on whether these cases seem to be hard or easy to recognize visually.
##Ans: Now, these cases specifically represent the best and worst cases of digit "8" being classified as digit "8."





#####TASK4#####

# Create a sequence of K values from 1 to 30
key <- 1:30

# Initialize vectors to store misclassification errors for training and validation
missclass_errortr <- numeric(30)
missclass_errorv <- numeric(30)

# Loop over different values of K
for (i in key) {
  # Fit K-nearest neighbor classifier on training data
  nearest1 <- kknn(as.factor(V65) ~ ., train = train, test = train, k = i, kernel = "rectangular")
  
  # Calculate misclassification error for training data
  cm_nearest1 <- table(train$V65, predict(nearest1))
  missclass_error_train <- 1 - sum(diag(cm_nearest1) / sum(cm_nearest1))
  missclass_errortr[i] <- missclass_error_train
  
  # Fit K-nearest neighbor classifier on validation data
  nearest2 <- kknn(as.factor(V65) ~ ., train = train, test = validation, k = i, kernel = "rectangular")
  
  # Calculate misclassification error for validation data
  cm_nearest2 <- table(validation$V65, predict(nearest2))
  missclass_error_valid <- 1 - sum(diag(cm_nearest2) / sum(cm_nearest2))
  missclass_errorv[i] <- missclass_error_valid
}

# Plot misclassification errors for training and validation
plot(key, missclass_errortr, ylab = "Misclassification Error", xlab = "K", col = "blue", type = "l", lty = 1, ylim = c(0, max(missclass_errortr, missclass_errorv)), main = "Errors for different K:s")
lines(key, missclass_errorv, col = "red", type = "l", lty = 2)
legend("topright", legend = c("Training", "Validation"), col = c("blue", "red"), lty = 1:2, cex = 0.8)

# Find the index where validation error is minimized
optimal_k_index <- which.min(missclass_errorv)
optimal_k <- key[optimal_k_index]

# Fit K-nearest neighbor classifier on training data with optimal K
optimal_nearest <- kknn(as.factor(V65) ~ ., train = train, test = test, k = optimal_k, kernel = "rectangular")

# Calculate misclassification error for test data
cm_optimal <- table(test$V65, predict(optimal_nearest))
missclass_error_test <- 1 - sum(diag(cm_optimal) / sum(cm_optimal))


##How does the model complexity change when K increases and how does it affect the training and validation errors? 
##ANS:  Complexity increases when K increases, as the number of parameters increase. 
##      In this case it also leads to higher error rates, indicating overfitting.


##Report the optimal 𝐾 according to this plot. 
cat("Optimal K:", optimal_k, "\n")
##ANS: 3

  ##Finally, estimate the test error for the model having the optimal K, 
##compare it with the training and validation errors and make necessary conclusions about the model quality.
cat("Misclassification Error for Training Data:", missclass_errortr[optimal_k], "\n")
cat("Misclassification Error for Validation Data:", missclass_errorv[optimal_k], "\n")
cat("Misclassification Error for Test Data:", missclass_error_test, "\n")

##ANS:  Around 97% accuracy for validation and test, which is good.






# TASK 5 #

key <- 1:30
entropy_error <- numeric(length = 30)

for (i in key) {
  # Fit K-nearest neighbor classifier on validation data
  nearest_valid <- kknn(as.factor(V65) ~ ., train = train, test = validation, k = i, kernel = "rectangular")
  
  # Initialize variables for cross-entropy calculation
  cross_entropy_valid <- 0
  
  # Loop over digits (0 to 9)
  for (digit in 0:9) {
    # Extract true labels for the digit in the validation set
    true_valid <- validation$V65 == digit
    
    # Extract probabilities for the digit in the validation set ("digit+1" because vector is 1 indexed in $prob)
    prob_valid <- nearest_valid$prob[true_valid, digit + 1] + 1e-15 
    
    # Calculate cross-entropy for validation data by += summary of all probabilities for the digit.
    cross_entropy_valid <- cross_entropy_valid + sum(-log(prob_valid))
  }
  
  # Store the cross-entropy error for the given K
  entropy_error[i] <- cross_entropy_valid
}

# Plot the dependence of the validation error on the value of K
plot(key, entropy_error, ylab = "Cross-Entropy Error", xlab = "K", col = "blue", main = "Cross-Entropy Error vs. K")

# Find the optimal K value
optimal_k_entropy <- which.min(entropy_error)
cat("Optimal K (based on cross-entropy):", optimal_k_entropy, "\n")


## Assuming that response has multinomial distribution, 
## why might the cross-entropy be a more suitable choice
## of the error function than the misclassification error for this problem?
##ANS:  Misclassification rate doesn't take into account the probabilities of the model's predictions.

