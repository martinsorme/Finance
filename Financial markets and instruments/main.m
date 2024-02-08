%Define red days
reddays= ['2023-12-24'; '2023-12-25';
'2023-12-26' ; '2023-12-31' ; '2024-01-01'; '2024-01-05'; '2024-03-29';
'2024-06-21'; '2024-05-01'; '2024-05-09'; '2024-06-06'; '2024-06-21'];

% ---------------------- Task 1

% European call option
% Binomial valuation

S = 62;                          % Underlying price
K = 55;                          % Strikeprice
sigma = 0.20;                    % Volatility
T1 = '2023-11-23';               % Start date
T2 = '2024-07-19';               % Maturity date
T = days252bus(T1, T2, reddays); % Days to expiry
N = 8;                           % Number of periods
r = 0.0427;                      % Risk-free rate

optionPrice = binomialValuation(S, K, T, 0, 0, r, sigma, N, "EU");
fprintf("Task 1: Calculate binomial valuation of European Call Option\n"); 
disp("Price: " + optionPrice); 

% ---------------------- Task 2

% European Call Option
% Implied volatility, Black & Scholes and Binomial Valuation 

S = 2228;                        % Underlying price
K = 2260;                        % Strikeprice
ask = 62.75;                     % Ask price
bid = 68.25;                     % Bid price
mid = (ask+bid)/2;               % Mid
T1 = '2023-11-23';               % Start date
T2 = '2024-03-15';               % Maturity date
T = days252bus(T1, T2, reddays); % Days to maturity
N = 200;                         % Number of periods
r = 0.0427;                      % Risk free rate

impliedVolatility = findImpliedVolatility(mid, S, K, T, r);
price = blackScholesCallPrice(S, K, T, r, impliedVolatility);
priceBinomial = binomialValuation(S, K, T, 0, 0, r, impliedVolatility, N, "EU"); 

fprintf('\nTask 2: Calculate Implicit Volatility, Option price with Black &\nScholes and Binomial Valuation\n');

disp(['Implicit volatility: ', num2str(impliedVolatility)]);
disp(['Price (Black & Scholes): ', num2str(price)]);
disp(['Price (Binomial Valuation): ', num2str(priceBinomial)]);

valuations = zeros(1, 200);

for i = 5:200
   optionPrice = binomialValuation(S, K, T, 0, 0, r, impliedVolatility, i, "EU");
   valuations(i) = optionPrice;
end
% Plotting the price based on number of periods
figure(1);
plot(5:200, valuations(5:end));
xlabel('Number of Steps in Binomial Tree');
ylabel('Option Valuation');
title('Task 2. Option Valuation vs Number of Steps in Binomial Tree');



% ---------------------- Task 3
% American & European Call Option with dividend
% Binomial valuation 

S = 62;                              % Underlying price
K = 55;                              % Strikeprice
sigma = 0.20;                        % Volatility
T1 = '2023-11-23';                   % Start date
T2 = '2024-07-19';                   % Maturity date
T3 = '2024-03-22';                   % Dividend date
T = days252bus(T1, T2, reddays);     % Days to maturity
Tdiv = days252bus(T1, T3, reddays);  % Days to div
DIV = 2.7;                           % Dividend amount             
N = 8;                               % Number of periods
r = 0.0427;                          % Risk-free rate

fprintf('\nTask 3: Calculate binomial valuation of European and American call option\n'); 
optionPriceAmerican = binomialValuation(S, K, T, Tdiv, DIV, r, sigma, N, "US");
optionPriceEuropean = binomialValuation(S, K, T, Tdiv, DIV, r, sigma, N, "EU");
disp("American option price: " + optionPriceAmerican); 
disp("European option price: " + optionPriceEuropean); 



% ---------------------- Task 4
% American Call Option with dividend
% Binomial Valuation and comparison with actual price

S = 569;                             % Underlying price
K = 630;                             % Strike price
sigma = 0.3083;                      % Volatility
bid = 34.75;                         % Bid price
ask = 54.75;                         % Ask price
mid = (bid + ask) / 2;               % Mid
T1 = '2023-11-23';                   % Start date
T2 = '2024-09-20';                   % Maturity date
T3 = '2024-04-12';                   % Dividend date
T = days252bus(T1, T2, reddays);     % Days to maturity
T2 = days252bus(T1, T3, reddays);    % Days to dividend
DIV = 5.3;                           % Dividend amount
N = 200;                             % Number of periods
r = 0.0427;                          % Risk-free rate


optionPrice = binomialValuation(S, K, T, T2, DIV, r, sigma, N, "US"); 
diff = (1-(optionPrice/mid))*100;
fprintf('\nTask 4: Calculate Binomial valuation of American call option with dividend\n');

disp(['Value American option: ', num2str(optionPrice)]);

% Difference due to incorrect given volatility
disp("Difference to actual: " + diff + "%")

% ---------------------- Task 5
% European up-and-in Barrier Option
% Binomial valuation for barrier reduction, implicit volatility

S = 2228;                            % Underlying price
K = 2260;                            % Strike price
ask = 62.75;                         % Ask price
bid = 68.25;                         % Bid price
mid = (ask+bid)/2;                   % Mid
T1 = '2023-11-23';                   % Start date
T2 = '2024-03-04';                   % Maturity date
T = days252bus(T1, T2, reddays);     % Days to maturity
N = 200;                             % Number of periods
r = 0.0427;                          % Risk free rate
barrierReduction = 0.05;             % Barrier reduction

% Find volatility
sigma = findImpliedVolatility(mid, S, K, T, r);
% Calculate price
fprintf('\nTask 5: Calculate price of exotic down-and-in barrier option\n'); 
optionPriceDI = DownInBarrierOption(S, K, r, T, sigma, N, barrierReduction);
disp(['Price (down-and-in barrier option): ', num2str(optionPriceDI)]);


% Vector for testing different barriers 
barrierReductions = 0:0.01:0.10; % From 1% to 10%
prices = zeros(size(barrierReductions)); % Storing prices

% Calculate price for each
for i = 1:length(barrierReductions)
    prices(i) = DownInBarrierOption(S, K, r, T, sigma, N, barrierReductions(i));
end

% Plot results
figure(2); 
plot(barrierReductions, prices);
xlabel('Barrier Reduction (%)');
ylabel('Price of Down-and-In Barrier Option');
title('Price of Down-and-In Barrier Option as a Function of Barrier Reduction');
grid on;


function optionPriceDI = DownInBarrierOption(S, K, r, T, sigma, N, barrierReduction)
    dt = (T/N) / 252;
    u = exp(sigma * sqrt(dt)); 
    d = exp(-sigma * sqrt(dt)); 
    p = (exp(r * dt) - d) / (u - d);
    

    barrier = S * (1 - barrierReduction);

    optionValues = zeros(N+1, N+1);
    for i = 0:N
        for j = 0:i
            stockPrice = S * u^(i-j) * d^j;
            optionValues(j+1, i+1) = max(0, stockPrice - K);
        end
    end 
    for i = N-1:-1:0
        for j = 0:i
            if S * u^(i-j) * d^j <= barrier
                optionValues(j+1, i+1) = 0;
            else
                optionValues(j+1, i+1) = exp(-r * dt) * (p * optionValues(j+1, i+2) + (1-p) * optionValues(j+2, i+2));
            end
        end
    end
    optionPriceDO = optionValues(1,1);
    optionPriceEU = binomialValuation(S, K, T, 0, 0, r, sigma, N, "EU");
    optionPriceDI = optionPriceEU - optionPriceDO;
end


function [optionPrice] = binomialValuation(S, K, T, Tdiv, DIV, r, sigma, N, type)
    dt = (T/N) / 252;
    u = exp(sigma * sqrt(dt));
    d = exp(-sigma * sqrt(dt));
    p = (exp(r * dt) - d) / (u - d);

    dt2 = Tdiv / 252; 
    
    PV_DIV = DIV*exp((-(r*dt2)));
    S_STAR = S-PV_DIV;
    
    stockTree = zeros(N+1, N+1);
    for i = 0:N
        for j = 0:i
            stockTree(j+1, i+1) = S_STAR * u^j * d^(i-j);
        end
    end
    
    if type == "EU"
        optionTree = zeros(N+1, N+1);
        for i = 0:N
            optionTree(i+1, N+1) = max(stockTree(i+1, N+1) - K, 0);
        end

        for i = N-1:-1:0
            for j = 0:i
                optionTree(j+1, i+1) = exp(-r * dt) * (p * optionTree(j+2, i+2) + (1-p) * optionTree(j+1, i+2));
            end
        end
       optionPrice = optionTree(1,1); 
        
    elseif type == "US"
        for i = N:-1:0
            for k = 0:i
                if i == N
                    optionTreeA(k+1, i+1) = ...
                        max(stockTree(k + 1,i + 1) - K, 0);
                else
                    if floor(dt2/dt) == i+1
                        optionTreeA(k+1, i+1) = max(stockTree(k+1,i+1) ...
                            + DIV -K, exp(-r*dt) * (((1-p) ...
                            * optionTreeA(k+1, i+2)) + p*optionTreeA(k+2,i+2)));

                    else
                        optionTreeA(k+1, i+1) = exp(-r * dt) ...
                            * (p * optionTreeA(k+2, i+2) + (1-p) ...
                            * optionTreeA(k+1, i+2));
                    end
                end
            end
        end
        optionPrice = optionTreeA(1,1);     
    end
    
end



function [impliedVolatility] = findImpliedVolatility(marketPrice, S, K, T, r)
    tol = 1e-5; %Tolerance
    maxIter = 1000;
    sigmaLow = 0.01;
    sigmaHigh = 1;
    
    for i = 1:maxIter
        sigmaMid = (sigmaLow + sigmaHigh) / 2;
        price = blackScholesCallPrice(S, K, T, r, sigmaMid);
        
        if abs(price - marketPrice) < tol
            impliedVolatility = sigmaMid;
            return;
        elseif price < marketPrice
            sigmaLow = sigmaMid;
        else
            sigmaHigh = sigmaMid;
        end
    end
    
    impliedVolatility = sigmaMid;
end

function [optionPrice] = blackScholesCallPrice(S, K, T, r, sigma)
    T = T/252; 
    d1 = (log(S/K) + (r + 0.5*sigma^2)*T) / (sigma*sqrt(T));
    d2 = d1 - sigma*sqrt(T);
    optionPrice = S * normcdf(d1) - K * exp(-r*T) * normcdf(d2);
end