"""add input and output

Revision ID: c8ae5953e23a
Revises: 181c7a32992e
Create Date: 2023-06-29 15:30:41.785648

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c8ae5953e23a'
down_revision = '181c7a32992e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('inputs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('value', sa.Float(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('outputs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('value', sa.Float(), nullable=True),
    sa.Column('baby_id', sa.Integer(), nullable=True),
    sa.Column('input_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['baby_id'], ['babies.id'], name=op.f('fk_outputs_baby_id_babies')),
    sa.ForeignKeyConstraint(['input_id'], ['inputs.id'], name=op.f('fk_outputs_input_id_inputs')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('outputs')
    op.drop_table('inputs')
    # ### end Alembic commands ###
