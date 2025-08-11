function rps_score(p1_move, p2_move) {
    let score = 0;

    if(p1_move === "rock" && p2_move === "paper") {
        score++;
    } else if(p1_move === "rock" && p2_move === "scissors") {
        score--;
    } else if(p1_move === "paper" && p2_move === "rock") {
        score++;
    } else if(p1_move === "paper" && p2_move === "scissors") {
        score--;
    } else if(p1_move === "scissors" && p2_move === "rock") {
        score--;
    } else if(p1_move === "scissors" && p2_move === "paper") {
        score++;
    } else {
        score += 0;
    }

    return score;
}