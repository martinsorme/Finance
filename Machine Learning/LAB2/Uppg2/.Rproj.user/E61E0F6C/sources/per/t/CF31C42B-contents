library(tree)

#### TASK 1 ####
rm(list = ls())

data = read.csv2("bank-full.csv", stringsAsFactors = TRUE)
data = data[, -12]

n=dim(data)[1]

set.seed(12345)
id=sample(1:n, floor(n*0.4))
train_data=data[id,]

id1=setdiff(1:n, id)
set.seed(12345)
id2=sample(id1, floor(n*0.3))
validation_data=data[id2,]

id3=setdiff(id1,id2)
test_data=data[id3,]

rm(data, id, id1, id2, id3, n)

#### TASK 2 ####

# Decision Tree with default settings
default_tree <- tree(y ~ ., data = train_data)
plot(default_tree)

# Decision Tree with the smallest allowed node size (7000)
node_size_tree <- tree(y ~ ., data = train_data, control = tree.control(nrow(train_data), minsize = 7000))
plot(node_size_tree)

# Decision Tree with minimum deviance set to 0.0005
deviance_tree <- tree(y ~ ., data = train_data, control = tree.control(nrow(train_data), mindev = 0.0005))
plot(deviance_tree)

# Extract misclassification rates
default_missclass = summary(default_tree)$misclass
node_size_missclass = summary(node_size_tree)$misclass
deviance_missclass = summary(deviance_tree)$misclass

# Misclassification rates for training data
train_missclass_rates <- list(
  default = default_missclass[1] / default_missclass[2],
  node_size = node_size_missclass[1] / node_size_missclass[2],
  deviance = deviance_missclass[1] / deviance_missclass[2]
)

# Predictions on validation set
pred_default <- predict(default_tree, newdata = validation_data, type = "class")
pred_node_size <- predict(node_size_tree, newdata = validation_data, type = "class")
pred_deviance <- predict(deviance_tree, newdata = validation_data, type = "class")

# Misclassification rates for validation data
validation_missclass_rates <- data.frame(
  default = mean(pred_default != validation_data$y),
  node_size = mean(pred_node_size != validation_data$y),
  deviance = mean(pred_deviance != validation_data$y)
)


#### TASK 3 ####

# Initialize vectors to store training and validation deviances
trainScore <- rep(0, 50)
validScore <- rep(0, 50)

# Find optimal number of leaves. 2:50 because i=1 gives error for prediciton
for (i in 2:50) {
  # Prune the tree to the specified number of leaves
  pruned_tree <- prune.tree(deviance_tree, best = i)
  
  # Predictions on validation set
  pred_pruned_tree <- predict(pruned_tree, newdata = validation_data, type = "tree")
  
  # Calculate deviances for training and validation data
  trainScore[i] <- deviance(pruned_tree)
  validScore[i] <- deviance(pred_pruned_tree)
}

# Visualize with plot
plot(2:50, trainScore[2:50], type = "b", col = "red", ylim = c(7000, max(trainScore, validScore)),
     main = "Optimal tree depth", ylab = "Deviance", xlab = "Size")
points(2:50, validScore[2:50], type = "b", col = "green")
legend("topright", c("train data", "validation data"), fill = c("red", "green"))

# Optimal number of leaves. [-1] since first element is 0 (2:50).
optimal_leaves_train <- which.min(trainScore[-1])
optimal_leaves_valid <- which.min(validScore[-1])
optimal_leaves <- data.frame(train = optimal_leaves_train, valid = optimal_leaves_valid)

# Optimal tree --- Ta bort rad 95, gör bara rad 98 på deviance_tree ---
optimal_tree <- tree(y ~ ., data = train_data, control = tree.control(nrow(train_data), mindev = 0.0005, minsize = optimal_leaves_valid))

# Prune the tree
pruned_optimal_tree <- prune.tree(optimal_tree, best = optimal_leaves_valid)

# Display pruned tree structure
plot(pruned_optimal_tree)
text(pruned_optimal_tree, pretty=1)

#### TASK 4 ####
# Predictions on the test set using the optimal model
test_predictions <- predict(pruned_optimal_tree, newdata = test_data, type = "class")

# Confusion Matrix 
confusion_matrix <- table(test_data$y, test_predictions)

# Calculate Accuracy
accuracy <- sum(diag(confusion_matrix)) / sum(confusion_matrix)

# Calculate precision TP/(TP+FP)
precision <- confusion_matrix[2,2]/(confusion_matrix[2,2] + confusion_matrix[1,2])

# Calculate Recall Rate TP/P
recall_rate <- confusion_matrix[2,2]/sum(confusion_matrix[2,])

# Calculate F1 Score
f1_score <- (2 * precision * recall_rate) / (precision + recall_rate)

# Print Results
cat("Confusion Matrix:\n", confusion_matrix)
cat("\nAccuracy for the optimal model:\n", accuracy)
cat("\nRecall Rate for the optimal model:\n", recall_rate)
cat("\nF1 Score for the optimal model:\n", f1_score)

#### TASK 5 ####

# Decision tree classification with Loss matrix:
loss_matrix <- matrix(c(0, 1, 5, 0), byrow = TRUE, nrow = 2)

# Predictions using the pruned optimal tree
probabilities <- predict(pruned_optimal_tree, newdata = test_data)

# loss om den gissar yes när det är no är P(no|x) * 1 enligt matris
# loss om den gissar no när det är yes är P(yes|x) * 5 enligt matris
# Matrix multiplication (p(no|x)*1 p(yes|x)*5)
losses <- probabilities %*% loss_matrix

# Find column index with lowest value along each row (max of negative)
lowest_indices <- max.col(-losses)

# Convert to levels
predictions_with_loss <- levels(test_data$y)[lowest_indices]

# Confusion matrix with loss matrix
confusion_matrix_loss <- table(test_data$y, predictions_with_loss)
confusion_matrix_loss

# Calculate Accuracy
accuracy_loss <- sum(diag(confusion_matrix_loss)) / sum(confusion_matrix_loss)

# Calculate precision TP/(TP+FP)
precision_loss <- confusion_matrix_loss[2,2]/(confusion_matrix_loss[2,2] + confusion_matrix_loss[1,2])

# Calculate Recall Rate TP/P
recall_rate_loss <- confusion_matrix_loss[2,2]/sum(confusion_matrix_loss[2,])

# Calculate F1 Score
f1_score_loss <- (2 * precision_loss * recall_rate_loss) / (precision_loss + recall_rate_loss)

# Print Results
cat("Confusion Matrix with Loss Matrix:\n", confusion_matrix_loss)
cat("\nAccuracy for the model with Loss Matrix:\n", accuracy_loss)
cat("\nF1 Score for the model with Loss Matrix:\n", f1_score_loss)

#### TASK 6 ####

# Logistic regression model
logistic_model <- glm(y ~ ., data = train_data, family = "binomial")

# Initialize vectors for TPR and FPR
tpr_tree <- rep()
fpr_tree <- rep()
tpr_logistic <- rep()
fpr_logistic <- rep()

# Computing ROC curves for the optimal tree and logistic regression model
for (pi in seq(from = 0.05, to = 0.95, by = 0.05)) {
  
  # Optimal tree predictions
  pred_tree <- ifelse(predict(pruned_optimal_tree, newdata = test_data, type = "vector")[, 2] > pi, "yes", "no")
  cm_tree <- table(pred_tree, test_data$y)

  #pred_tree    no    yes
  #         no  TN    FN
  #         yes FP    TP
  
  #Sometimes model never predicts "yes", giving no tpr
  if (nrow(cm_tree) >= 2) {
    #TPR = TP / TP + FN
    tpr_tree <- c(tpr_tree, cm_tree[2, 2] / sum(cm_tree[, 2]))
    #FPR =  FP / FP + TN
    fpr_tree <- c(fpr_tree, cm_tree[2, 1] / sum(cm_tree[, 1]))
  }
  

  # Logistic regression predictions
  pred_logistic <- ifelse(predict(logistic_model, newdata = test_data, type = "response") > pi, "yes", "no")
  cm_logistic <- table(pred_logistic, test_data$y)
  
  if (nrow(cm_logistic) >= 2) {
    tpr_logistic <- c(tpr_logistic, cm_logistic[2, 2] / sum(cm_logistic[, 2]))
    fpr_logistic <- c(fpr_logistic, cm_logistic[2, 1] / sum(cm_logistic[, 1]))
  }
}

# Plotting ROC curves
plot(fpr_tree, tpr_tree, pch = 5, type = "b", col = "red", main = "ROC Curves", xlab = "False Positive Rate (FPR)", ylab = "True Positive Rate (TPR)")
points(fpr_logistic, tpr_logistic, pch = 5, type = "b", col = "blue")
legend("bottomright", c("Optimal Tree", "Logistic Regression"), fill = c("red", "blue"))
