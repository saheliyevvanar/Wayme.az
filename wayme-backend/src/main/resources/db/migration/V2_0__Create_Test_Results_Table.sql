-- V2_0__Create_Test_Results_Table.sql
-- Table to store test results

CREATE TABLE IF NOT EXISTS test_results (
    id BIGSERIAL PRIMARY KEY,
    personal_info_id BIGINT NOT NULL,
    category_title VARCHAR(255),
    sub_category_title VARCHAR(255),
    total_questions INTEGER,
    correct_answers INTEGER,
    score_percentage DECIMAL(5, 2),
    answers_json TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (personal_info_id) REFERENCES personal_info(id) ON DELETE CASCADE,
    CONSTRAINT unique_personal_test UNIQUE(personal_info_id)
);

CREATE INDEX idx_test_results_personal_info_id ON test_results(personal_info_id);
