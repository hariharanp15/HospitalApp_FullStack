import logging
import os

def setup_logger():
    log_dir = "logs"
    log_file = os.path.join(log_dir, "app.log")

    os.makedirs(log_dir, exist_ok=True)

    logging.basicConfig(
        filename=log_file,
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(message)s",
    )