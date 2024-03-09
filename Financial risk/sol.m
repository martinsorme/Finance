value_portfolio = 10000000;
n = 15;
n_observations = 1647;

data_table = readtable('timeSeries.xlsx');
dates = data_table{:, 2};

% ------ Question a

% Calculate returns
returns = zeros(n_observations-1, n);
for i = 1:n
    for j = 1:n_observations-1
        returns(j,i)=(timeSeries(j+1,i)-timeSeries(j,i))/timeSeries(j,i);
    end
end

% Calculate volatility
sigma_portfolio = sqrt(portvar(returns(1:1646, 1:15)));

mean_return_shares = mean(returns);
mu_p = mean(returns); 

% VaR adjusted for mean return
var_95 = -mu_p + norminv(0.95) * sigma_portfolio * value_portfolio;
var_97 = -mu_p + norminv(0.975) * sigma_portfolio * value_portfolio;
var_99 = -mu_p + norminv(0.99) * sigma_portfolio * value_portfolio;


% ------ Question b

% Calculations done in excel file
EWMA_var_95 = readmatrix('timeSeries.xlsx', 'Sheet', 'Problem 1 and 2', 'Range', 'BV504:BV1649');
EWMA_var_99 = readmatrix('timeSeries.xlsx', 'Sheet', 'Problem 1 and 2', 'Range', 'BW504:BW1649');

figure(1)
subplot(2, 1, 1);
plot(dates(503:1648), EWMA_var_95);
title('EWMA VaR 95, 1v');
ylabel('Relative Value at Risk (VaR)');

subplot(2, 1, 2);
plot(dates(503:1648), EWMA_var_99);
title('EWMA VaR 99, 1v'); 
ylabel('Relative Value at Risk (VaR)');



% ------ Question c

weighted_returns = readmatrix('timeSeries.xlsx', 'Sheet', 'Problem 1 and 2', 'Range', 'AJ4:AJ1649');
sigma_rolling = zeros((1647-502), 1);
roll_var_95 = zeros((1647-502), 1);
roll_var_99 = zeros((1647-502), 1);

for i = 502:1647
    list = sort(weighted_returns(i-501:i-2));
    roll_var_95(i-501) = -list(25);
    roll_var_99(i-501) = -list(5);
end

sorted_weighted_returns_500 = sort(weighted_returns(1646-499:1646)); 
ES_95_1w = mean(sorted_weighted_returns_500(1:5)); 

figure(2);
subplot(2, 1, 1);
plot(dates(503:1648), roll_var_95);
title('Rolling window VaR 95, 1v'); 
ylabel('Relative Value at Risk (VaR)');

subplot(2, 1, 2);
plot(dates(503:1648), roll_var_99);
title('Rolling window VaR 99, 1v');
ylabel('Relative Value at Risk (VaR)');


% ------ Question d

sigma_HW = zeros(1646,1);
% Initialize first sigma t = 2
sum = 0;
for i = 1:20
    sum = sum + (weighted_returns(i) - mean(weighted_returns(1:20)))^2; 
end

sigma_HW(1) = sqrt((1/19) * sum);
roll_var_95_HW = zeros((1647-504),1);
roll_var_99_HW = zeros((1647-504),1);
lambda = 0.94;
for i = 2:1646
    sigma_HW(i) = sqrt(lambda * sigma_HW(i-1)^2 + (1 - lambda) * weighted_returns(i-1)^2);
end

epsilon = weighted_returns./sigma_HW;

for i = 1 : 1647-502
   epsilon_500 = epsilon(i:(i+499));
   r_star = epsilon_500 .* sigma_HW(i);
   roll_var_95_HW(i) = -prctile(sort(r_star), 5);
   roll_var_99_HW(i) = -prctile(sort(r_star), 1);
end

figure(3);
subplot(2, 1, 1);
plot(dates(504:1648), roll_var_95_HW);
title('Rolling Window VaR 95 (H&W)');
ylabel('Relative Value at Risk (VaR)');

subplot(2, 1, 2);
plot(dates(504:1648), roll_var_99_HW);
title('Rolling Window VaR 99 (H&W)');
ylabel('Relative Value at Risk (VaR)');


% ------ Question e


% Failure test task b
time_series_subset = timeSeries(502:1648);
b_weighted_returns_subset = weighted_returns(501:1646);

% Index
b_below_var_index_95 = b_weighted_returns_subset < -EWMA_var_95;
b_above_var_index_95 = b_weighted_returns_subset >= -EWMA_var_95;


figure(10);
scatter(time_series_subset(b_below_var_index_95), b_weighted_returns_subset(b_below_var_index_95), 2, 'r'); % Red for points below -var_95_1w
title("95 var");
hold on;
scatter(time_series_subset(b_above_var_index_95), b_weighted_returns_subset(b_above_var_index_95), 2, 'b'); % Blue for points above -var_95_1w
plot(timeSeries(503:1648), -EWMA_var_95, 'k'); % Plot -var_95_1w in black
hold off;

% 99 var
b_below_var_index_99 = b_weighted_returns_subset < -EWMA_var_99;
b_above_var_index_99 = b_weighted_returns_subset >= -EWMA_var_99;

figure(11);
scatter(time_series_subset(b_below_var_index_99), b_weighted_returns_subset(b_below_var_index_99), 2, 'r'); % Red for points below -var_95_1w
title("99 var");
hold on;
scatter(time_series_subset(b_above_var_index_99), b_weighted_returns_subset(b_above_var_index_99), 2, 'b'); % Blue for points above -var_95_1w
plot(timeSeries(503:1648), -EWMA_var_99, 'k'); % Plot -var_95_1w in black
hold off;


%Failure-test task b
b_fail_95=length(b_weighted_returns_subset(b_below_var_index_95))/length(b_weighted_returns_subset);
b_fail_99=length(b_weighted_returns_subset(b_below_var_index_99))/length(b_weighted_returns_subset);

z_b_95 = (length(b_weighted_returns_subset(b_below_var_index_95)) - length(b_weighted_returns_subset) * 0.05)/sqrt(length(b_weighted_returns_subset)*0.95);
z_b_99 = (length(b_weighted_returns_subset(b_below_var_index_99)) - length(b_weighted_returns_subset) * 0.05)/sqrt(length(b_weighted_returns_subset)*0.99);

h0_b_95 = (z_b_95 > norminv(0.975) || z_b_95 < norminv(1-0.975));
h0_b_99 = (z_b_95 > norminv(0.975) || z_b_95 < norminv(1-0.975));

% Failure-test task c
c_weighted_returns_subset = weighted_returns(501:1646);
c_below_var_index_95 = c_weighted_returns_subset < -roll_var_95;
c_below_var_index_99 = c_weighted_returns_subset < -roll_var_99;

c_fail_95=length(c_weighted_returns_subset(c_below_var_index_95))/length(c_weighted_returns_subset);
c_fail_99=length(c_weighted_returns_subset(c_below_var_index_99))/length(c_weighted_returns_subset);

z_c_95 = (length(c_weighted_returns_subset(c_below_var_index_95)) - length(c_weighted_returns_subset) * 0.05)/sqrt(length(c_weighted_returns_subset)*0.95);
z_c_99 = (length(c_weighted_returns_subset(c_below_var_index_95)) - length(c_weighted_returns_subset) * 0.05)/sqrt(length(c_weighted_returns_subset)*0.99);

h0_c_95 = (z_b_95 > norminv(0.975) || z_b_95 < norminv(1-0.975));
h0_c_99 = (z_b_95 > norminv(0.975) || z_b_95 < norminv(1-0.975));

% Failure-test task d
d_weighted_returns_subset = weighted_returns(502:1646);
d_below_var_index_95 = d_weighted_returns_subset < -roll_var_95_HW;
d_below_var_index_99 = d_weighted_returns_subset < -roll_var_99_HW;

d_fail_95=length(c_weighted_returns_subset(d_below_var_index_95))/length(d_weighted_returns_subset);
d_fail_99=length(c_weighted_returns_subset(d_below_var_index_99))/length(d_weighted_returns_subset);

z_d_95 = (length(c_weighted_returns_subset(d_below_var_index_95)) - length(d_weighted_returns_subset) * 0.05)/sqrt(length(d_weighted_returns_subset)*0.95);
z_d_99 = (length(c_weighted_returns_subset(d_below_var_index_95)) - length(d_weighted_returns_subset) * 0.05)/sqrt(length(d_weighted_returns_subset)*0.99);

h0_d_95 = (z_b_95 > norminv(0.975) || z_b_95 < norminv(1-0.975));
h0_d_99 = (z_b_95 > norminv(0.975) || z_b_95 < norminv(1-0.975));


% ------ Question f

% Based on Christoffersen. 95%
% n00, n01, n10, n11;
% pi, pi_01, pi_10, pi_11]
[b_n, b_pi] = calculate_pi_95(b_below_var_index_95);
[c_n, c_pi] = calculate_pi_95(c_below_var_index_95);
[d_n, d_pi] = calculate_pi_95(d_below_var_index_95);

% For b
b_formula = -2 * log((1 - b_pi(1)) ^ (b_n(1) + b_n(3)) * (b_pi(1)^(b_n(2) + b_n(4)))) + 2 * log(((1 - b_pi(2))^b_n(1)) * (b_pi(2)^b_n(2)) * ((1 - b_pi(4))^b_n(3)) * (b_pi(4)^b_n(4)));

% For c
c_formula = -2 * log((1 - c_pi(1)) ^ (c_n(1) + c_n(3)) * (c_pi(1)^(c_n(2) + c_n(4)))) + 2 * log(((1 - c_pi(2)) ^ c_n(1)) * (c_pi(2) ^ c_n(2)) * ((1 - c_pi(4)) ^ c_n(3)) * (c_pi(4) ^ c_n(4)));

% For d
d_formula = -2 * log((1 - d_pi(1))^(d_n(1) + d_n(3)) * (d_pi(1)^(d_n(2) + d_n(4)))) + 2 * log(((1 - d_pi(2))^d_n(1)) * (d_pi(2)^d_n(2)) * ((1 - d_pi(4))^d_n(3)) * (d_pi(4)^d_n(4)));



% ----------------------- Task 2

% ------ Question a
sorted_returns = sort(weighted_returns); 
% See excel, sheet Task2a for calculations and Solver

u_2a = -0.046733078437709;
beta_2a = 0.0264395318140892;
xi_2a = -0.0476611161251823;
max_log_likliehod_2a = 217.1042779;

EVT_var_99 = u_2a + (beta_2a/xi_2a)*(((1646*0.99/82)^(-xi_2a))-1);

% ------ Question b
sorted_returns_5y = sort(weighted_returns(1646-(5*52):1646));
% Parameters calculated in Excel Solver
beta_2b = 0.01714773;
xi_2b = 0.177146969;
max_log_likliehod_2b = 233.988;


% ----------------------- Task 3
% ------ Question a

SPX_delta = readmatrix('timeSeries.xlsx', 'Sheet', 'Problem 3', 'Range', 'G5:G3429');
VIX_delta = readmatrix('timeSeries.xlsx', 'Sheet', 'Problem 3', 'Range', 'H5:H3429');
LIBOR_delta = readmatrix('timeSeries.xlsx', 'Sheet', 'Problem 3', 'Range', 'I5:I3429');



% Strike prices
K1 = 4700;
K2 = 4600;
K3 = 4750;

S = 4670.29; 

T1 = 49/252;
T2 = 49/252; 
T3 = 67/252;

r = 0.23829/100;
vix = 19.4/100;
v1 = 15.77/100;
v2 = 18.28/100;
v3 = 16.25/100;

q = 0.05; 

data_matrix = [SPX_delta, VIX_delta, LIBOR_delta];
C_xi = cov(data_matrix);

% Calculate values of Options
[value_c1, value_p1] = blackScholes(S, K1, r, T1, v1, q);
[value_c2, value_p2] = blackScholes(S, K2, r, T2, v2, q);
[value_c3, value_p3] = blackScholes(S, K3, r, T3, v3, q);

% Holdings
h = [10000; 10000; 20000];

% Calculate portfolio value
vp_option = h(1) * value_c1 + h(2) * value_p2 + h(3) * value_c3; 


% [c1_delta, p1_delta] = blsdelta(S, K1, r, T1, v1, q);
% [c2_delta, p2_delta] = blsdelta(S, K2, r, T2, v2, q); 
% [c3_delta, p3_delta] = blsdelta(S, K3, r, T3, v3, q); 
% [calculateDelta(S, K1, r, T1, v1, true, q), calculateDelta(S, K2, r, T2, v2, false, q), calculateDelta(S, K3, r, T3, v3, true, q)]; 
delta_matrix = [calculateDelta(S, K1, r, T1, v1, true, q), calculateDelta(S, K2, r, T2, v2, false, q), calculateDelta(S, K3, r, T3, v3, true, q)]; 
rho_matrix = [calculateRho(S, K1, r, T1, v1, true, q), calculateRho(S, K2, r, T2, v2, false, q), calculateRho(S, K3, r, T3, v3, true, q)]; 
vega_matrix = [calculateVega(S, K1, r, T1, v1, q), calculateVega(S, K2, r, T2, v2, q), calculateVega(S, K3, r, T3, v3, q)]; 

G = [delta_matrix; rho_matrix; vega_matrix];

sigma_estimate = sqrt((1/(vp_option^2)) * h' * G' * C_xi * G * h); 

var_port = norminv(0.99) * vp_option * sigma_estimate * sqrt(1/252); 

% ------ Question b

h1_contribution = G' * C_xi * G * h/((sigma_estimate^2) * (vp_option^2));
h2_contribution = G' * C_xi * G * h/((sigma_estimate^2) * (vp_option^2)); 
h3_contribution = G' * C_xi * G * h/((sigma_estimate^2) * (vp_option^2)); 

%C_xi är var(delta(xi))

function [n, pi_95] = calculate_pi_95(below_var_index_95)
    % Returns pi, pi_01, pi_10, pi_11 in that order
    n00 = 0;
    n01 = 0;
    n10 = 0;
    n11 = 0;
    for i = 2:length(below_var_index_95)
        if below_var_index_95(i) == 0
            if below_var_index_95(i - 1) == 0
                n00 = n00 + 1;
            else
                n10 = n10 + 1;
            end
        elseif below_var_index_95(i) == 1
            if below_var_index_95(i - 1) == 0
                n01 = n01 + 1;
            else
                n11 = n11 + 1;
            end
        end
    end
    pi = (n01 + n11) / length(below_var_index_95);
    pi_01 = n01 / (n00 + n01); 
    pi_10 = n10 / (n10 + n00); 
    pi_11 = n11 / (n10 + n11);
    
    n = [n00, n01, n10, n11];
    pi_95 = [pi, pi_01, pi_10, pi_11];
end

function delta = calculateDelta(S, K, r, T, sigma, isCall, q)
    % S: Current stock price
    % K: Strike price
    % r: Annual risk-free rate
    % T: Time to expiration (in years)
    % sigma: Annualized stock price volatility
    % isCall: Boolean (true for call, false for put)
    % q: Annual dividend yield

    d1 = (log(S / K) + (r - q + (0.5 * sigma^2)) * T) / (sigma * sqrt(T));
    
    if isCall
        delta = exp(-q * T) * normcdf(d1);
    else
        delta = -exp(-q * T) * (normcdf(-d1));
    end
end


function vega = calculateVega(S, K, r, T, sigma, q)
    % Same inputs as before
    d1 = (log(S / K) + (r - q + 0.5 * sigma^2) * T) / (sigma * sqrt(T));
    vega = S * exp(-q * T) * normpdf(d1) * sqrt(T);
    
end


function rho = calculateRho(S, K, r, T, sigma, isCall, q)
    % r: Annual risk-free rate
    % q: Annual dividend yield
    d2 = (log(S / K) + (r - q - 0.5 * sigma^2) * T) / (sigma * sqrt(T));
    
    if isCall
        rho = K * T * exp(-r * T) * normcdf(d2); 
    else
        rho = - K * T * exp(-r * T) * normcdf(-d2); 
    end
end

function [call_price, put_price] = blackScholes(S, K, r, T, sigma, q)
    % S: Current stock price
    % K: Strike price
    % r: Annual risk-free rate
    % T: Time to expiration (in years)
    % sigma: Annualized stock price volatility
    % q: Annual dividend yield

    d1 = (log(S / K) + (r - q + 0.5 * sigma^2) * T) / (sigma * sqrt(T));
    d2 = d1 - sigma * sqrt(T);

    call_price = S * exp(-q * T) * normcdf(d1) - K * exp(-r * T) * normcdf(d2);
    put_price = K * exp(-r * T) * normcdf(-d2) - S * exp(-q * T) * normcdf(-d1);
end











