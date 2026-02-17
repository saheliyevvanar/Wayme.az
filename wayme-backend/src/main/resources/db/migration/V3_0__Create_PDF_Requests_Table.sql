CREATE TABLE pdf_requests (
    id BIGSERIAL PRIMARY KEY,
    personal_info_id BIGINT NOT NULL,
    email VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    sent_at TIMESTAMP NULL,
    error_message TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (personal_info_id) REFERENCES personal_info(id) ON DELETE CASCADE
);

CREATE INDEX idx_pdf_requests_personal_info_id ON pdf_requests(personal_info_id);
CREATE INDEX idx_pdf_requests_status ON pdf_requests(status);
